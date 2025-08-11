exports.createConversation = (req, res) => {
  const conversationDetails = req.body;
  console.log(req.body);
  res.status(201).json({
    status: "Conversation created successfully",
    data: {
      conversation: conversationDetails,
    },
  });
};

exports.getAllConversation = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      conversations: [
        { id: 1, title: "General Inquiry" },
        { id: 2, title: "Technical Support" },
      ],
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

exports.deleteConversation = (req, res) => {
  const conversationId = req.params.id;
  console.log(`Conversation with ID ${conversationId} deleted`);
  res.status(204).json({
    status: "Conversation deleted successfully",
    data: null,
  });
};

exports.sendMessage = (req, res) => {
  const conversationId = req.params.id;

  const { content } = req.body;

  console.log(conversationId, content);

  res.status(200).json({
    status: "Message sent successfully",
    data: {
      user: {
        id: "msg_123",
        conversationId: conversationId,
        role: "user",
        content: content,
        timestamp: "2024-01-15T10:30:00Z",
      },
      bot: {
        id: "msg_123",
        conversationId: "conv_456",
        role: "user",
        content: "React is a javascript framework",
        timestamp: "2024-01-15T10:30:00Z",
      },
    },
  });
};
