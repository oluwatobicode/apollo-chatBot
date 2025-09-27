const crypto = require("crypto");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");

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

  try {
    const newUser = await User.create(signUpDetails);
    const verifyEmailToken = newUser.generateVerificationCode();

    console.log("verify email here:", verifyEmailToken);
    const token = generateAuthToken(newUser._id);

    res.status(201).json({
      status: "Sign Up successful",
      token,
    });

    await sendEmail({
      email: newUser.email,
      subject: "Welcome to Apollo Chatbot! 🚀",
      html: `
    <h2>Welcome aboard, ${newUser.firstName}!</h2>
    <p>Your email has been verified successfully.</p>
    <p>You're all set to start chatting with Apollo...</p>

  `,
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};

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

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) get the user based on the posted email
    const user = await User.findOne({ email: req.body.email });

    console.log(user);

    if (!user) {
      throw new Error("There is no user found");
    }

    // 2) if the user is in the db send a token
    const resetToken = user.generateResetToken();
    console.log(resetToken);
    await user.save({ validateBeforeSave: false });

    const mailUrl = `${req.protocol}://${req.get(
      "host"
    )}/v1/api/auth/resetPassword/${resetToken}`;

    const message = `This is the url for the resetting of passwords: ${mailUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token is only valid for 10 min",
        message: message,
        html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>Hi there!</p>
      <p>We received a request to reset your Apollo Chatbot password.</p>
      <a href="${message}" 
         style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Reset My Password
      </a>
      <p>This link expires in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({
        status: "error",
        message: "There was an error sending email. Please try again.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Kindly check your mail!",
      data: {
        resetToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "error",
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  console.log(req.params.token);
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      });
    }

    console.log(req.body.password);

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    console.log(user);

    createSendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }

  next();
};

exports.logOut = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
