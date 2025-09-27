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
    const newMessage = await Message.create(req.body);
    const response = await botResponse(req.body.text);
    console.log("Full response", response);
    console.log("Contracted Response", response.text);

    res.status(200).json({
      status: "success",
      data: {
        newMessage,
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
