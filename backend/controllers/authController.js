exports.signUp = (req, res) => {
  const signUpDetails = req.body;
  console.log(req.body);
  res.status(201).json({
    status: "Sign Up successfully",
    data: {
      userDetails: signUpDetails,
    },
  });
};

exports.logIn = (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
      conversation: [],
    },
  });
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
