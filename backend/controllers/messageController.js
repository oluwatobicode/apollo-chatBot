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
  try {
    const userMessage = await Message.create({
      text: req.body.text,
      sender: "User",
      conversation: req.body.conversation,
    });

    const response = await botResponse(req.body.text);
    console.log(response.text);

    const botMessage = await Message.create({
      text: response.text,
      sender: "Bot",
      conversation: req.body.conversation,
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
