const Message = require("../models/messageModel");

exports.createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newMessage,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
