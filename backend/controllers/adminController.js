exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    users: 12,
    data: {
      users: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
    },
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  console.log(`Fetching user with ID: ${userId}`);
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: userId,
        name: "John Doe",
        email: "",
        country: "USA",
        profilePicture: "https://example.com/profile.jpg",
      },
    },
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  console.log(`User with ID ${userId} deleted`);
  res.status(204).json({
    status: "User deleted successfully",
    data: null,
  });
};
