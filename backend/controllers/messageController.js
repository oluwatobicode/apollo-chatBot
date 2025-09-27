const { GoogleGenAI } = require("@google/genai");
const Message = require("../models/messageModel");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const botResponse = async (text) => {
  return await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
  });
};

exports.createMessage = async (req, res) => {
  const { id } = req.params;

  console.log(
    "Conversation ID test:",
    id,
    "Conversation id test 2",
    req.body.conversation
  );

  try {
    const userMessage = await Message.create({
      text: req.body.text,
      sender: "User",
      conversation: id,
    });

    const conversationHistory = await Message.find({
      conversation: id,
    }).sort({ timestamp: 1 });

    const formattedHistory = conversationHistory.map((msg) => ({
      role: msg.sender === "User" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    formattedHistory.push({
      role: "user",
      parts: [{ text: req.body.text }],
    });

    console.log(formattedHistory);

    const response = await botResponse(formattedHistory);
    console.log(response.text);

    const botMessage = await Message.create({
      text: response.text,
      sender: "Bot",
      conversation: id,
    });
    // console.log("Full response", response);
    // console.log("Contracted Response", response.text);

    res.status(200).json({
      status: "success",
      data: {
        userMessage,
        botMessage,
      },
    });
  } catch (error) {
    console.log("There was an error", error);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
