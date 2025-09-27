const User = require("../models/userModel");

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateProfile = (req, res) => {
  const updatedProfile = req.body;
  console.log(req.body);
  res.status(200).json({
    status: "Profile updated successfully",
    data: {
      updateProfile: updatedProfile,
    },
  });
};
