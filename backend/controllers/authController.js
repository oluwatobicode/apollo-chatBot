const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/**
 * Generate JWT token for user authentication
 *
 * JWT Structure: HEADER.PAYLOAD.SIGNATURE (separated by dots)
 *
 * HEADER: {"alg":"HS256","typ":"JWT"} - Specifies signing algorithm
 * PAYLOAD: {"id":"userId","iat":timestamp,"exp":timestamp} - User data & token metadata
 * SIGNATURE: Cryptographic signature created using header+payload+secret
 *
 * Security Notes:
 * - Payload is Base64 encoded (readable by anyone) - never store sensitive data
 * - Signature prevents tampering - only server with JWT_SECRET can create valid tokens
 * - Token is stateless - contains all info needed for authentication
 *
 * @param {string} id - User's database ID to embed in token payload
 * @returns {string} - Complete JWT token for client authentication
 */
const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, res) => {
  // 1) first sign the token
  const token = generateAuthToken(user._id);

  // 2) create our cookie-option
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ), //  we would  convert days to second
    httpOnly: true,
    secure: false, // we will set this to true in production
    sameSite: "strict", // this would help in csrf protection
  };

  // we will set our secure to true in production
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  res.cookie("jwt", token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = async (req, res) => {
  // extract everything here
  const signUpDetails = req.body;

  // 1) creating a user
  const newUser = await User.create(signUpDetails);

  const token = generateAuthToken(newUser._id);

  res.status(201).json({
    status: "Sign Up successful",
    token,
    data: {
      newUser,
    },
  });
};

// exports.logIn = async (req, res) => {
//   // 1) extract the relevant information from here
//   const { email, password } = req.body;

//   // 2) check if the user put in his details
//   if (!email && !password) {
//     throw new Error("Kindly put in your email or password!");
//   }

//   // NOTE: findOne returns a single document object or null while find returns an array
//   // The .select("+password") explicitly includes the password field despite select:false
//   // in schema - this is intentional for auth operations but should never be sent to client
//   const user = await User.findOne({ email }).select("+password");

//   if (!user || !(await user.comparePasswords(password, user.password))) {
//     throw new Error("Incorrect details!");
//   }

//   console.log(user);

//   // when the user logs in we do not give them back their details
//   const token = generateAuthToken(user._id);

//   res.status(201).json({
//     status: "success",
//     token,
//   });
// };

exports.login = async (req, res, next) => {
  try {
    // 1) extract the relevant information from here
    const { email, password } = req.body;

    // 2) check if the user put in his details
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password!",
      });
    }

    // NOTE: findOne returns a single document object or null while find returns an array
    // The .select("+password") explicitly includes the password field despite select:false
    // in schema - this is intentional for auth operations but should never be sent to client
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePasswords(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    console.log(user);
    // Send token via cookie (  // when the user logs in we do not give them back their details)
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

exports.protectedRoutes = async (req, res, next) => {
  try {
    let token;

    // STEP 1: Extract token from Authorization header
    // Client sends: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Get part after "Bearer "
    }

    // STEP 2: Reject if no token provided
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // STEP 3: Verify token signature and decode payload
    // This checks: Is signature valid? Is token expired?
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // decoded = { id: "userId", iat: timestamp, exp: timestamp }

    // STEP 4: Check if user still exists in database
    // (User might have been deleted after token was issued)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    // STEP 5: Attach user to request object for downstream use
    req.user = currentUser;

    // STEP 6: Pass control to next middleware/route handler [learnt this the hard-way]
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token. Please log in again!",
    });
  }
};

exports.verifyEmail = (req, res) => {
  const verifyEmail = req.body;
  console.log(req.body);
  res.status(201).json({
    status: "verified successfully",
    data: {
      userDetails: verifyEmail,
    },
  });
};

exports.twoFactorAuth = (req, res) => {
  const twoFactorDetails = req.body;
  console.log(req.body);
  res.status(201).json({
    status: "2FA successfully",
    data: {
      userDetails: twoFactorDetails,
    },
  });
};

exports.logOut = (req, res) => {
  res.status(200).json({
    status: "Logged out",
  });
};

exports.newPassword = (req, res) => {
  res.status(200).json({
    status: "New Password Set",
    data: {
      newPassword: req.body.newPassword,
    },
  });
};
