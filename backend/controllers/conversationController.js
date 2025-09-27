const Conversation = require("../models/conversationModel");
const mongoose = require("mongoose");

const checkIsValidId = (id) => {
  return mongoose.isValidObjectId(id);
};

exports.createConversation = async (req, res) => {
  const conversationData = {
    title: req.body.title,
    user: req.user.id,
  };

  try {
    const newConv = await Conversation.create(conversationData);

    console.log(req.params.id);

    console.log(newConv);

    res.status(201).json({
      status: "Conversation created successfully",
      results: 1,
      data: {
        data: newConv,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllConversation = async (req, res) => {
  try {
    const allConv = await Conversation.find({ user: req.user.id });

    res.status(200).json({
      status: "success",
      results: allConv.length,
      data: {
        allConv,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a Conversation ID",
      });
    }

    if (!checkIsValidId(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid conversation ID forma",
      });
    }

    const getConversation = await Conversation.findById(id)
      .populate("messages")
      .populate("user", "firstName lastName email");

    if (!getConversation) {
      return res.status(404).json({
        status: "fail",
        message: "No conversation found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        conversation: getConversation,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteConversation = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide a Conversation ID",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid conversation ID format",
      });
    }

    const conversationId = await Conversation.findByIdAndDelete(id);

    if (!conversationId) {
      return res.status(404).json({
        status: "fail",
        message: "No conversation found with that ID",
      });
    }

    console.log(`Conversation with ID ${conversationId} deleted`);
    res.status(204).json({
      status: "Conversation deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
