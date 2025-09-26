const Conversation = require("../models/conversationModel");

exports.createConversation = async (req, res) => {
  const newConv = await Conversation.create(req.body);

  console.log(newConv);

  res.status(201).json({
    status: "Conversation created successfully",
    results: newConv.length,
    data: {
      data: newConv,
    },
  });
};

exports.getAllConversation = async (req, res) => {
  const allConv = await Conversation.find({ _id: req.params.id });

  res.status(200).json({
    status: "success",
    data: {
      allConv,
    },
  });
};

exports.getConversationById = (req, res) => {
  const conversationId = req.params.id;
  console.log(`Fetching conversation with ID: ${conversationId}`);
  res.status(200).json({
    status: "success",
    data: {
      conversation: {
        id: conversationId,
        messages: [
          { sender: "user", text: "Hello!" },
          { sender: "bot", text: "Hi there! How can I help you?" },
        ],
      },
    },
  });
};

exports.deleteConversation = async (req, res) => {
  console.log(req.params.id);
  const conversationId = await Conversation.findByIdAndDelete(req.params.id);

  console.log(`Conversation with ID ${conversationId} deleted`);
  res.status(204).json({
    status: "Conversation deleted successfully",
    data: null,
  });
};
