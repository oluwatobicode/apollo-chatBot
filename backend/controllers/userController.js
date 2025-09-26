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
