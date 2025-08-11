exports.getProfile = (req, res) => {
  const user = {
    name: "Treasure",
    email: "odetokuntreasure6@gmail.com",
    profilePicture: "https://example.com/profile.jpg",
    country: "Nigeria",
  };
  res.status(200).json({
    status: "success",
    data: {
      user: user,
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
