const { GoogleGenAI } = require("@google/genai");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const { getConversationById } = require("./conversationController");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MAX_MESSAGES_IN_CONTEXT = 20;

// configuration for our ai model
const botResponse = async (text) => {
  return await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
    config: {
      systemInstruction: `
      You are Apollo, an AI chatbot assistant for university students.
      - Your name is Apollo
      - You were created by Boyethecreator (Blessing Adeboye) and Coding Ninja (Treasure Odetokun)
      Your role is to:
- Answer academic questions clearly and accurately, step by step.
- Help students study by explaining concepts in simple language.
- Provide examples, summaries, and practice questions when useful.
- Encourage students with a supportive and motivating tone.
- If a question is outside academics, politely redirect back to study-related topics.
- Always keep answers concise, clear, and beginner-friendly unless asked for more depth.
      `,
    },
  });
};

const generateTitle = async (firstMessage) => {
  const prompt = `Generate a short, descriptive title (max 6 words) for a conversation that starts with: "${firstMessage}". Only return the title, nothing else.`;

  console.log(prompt);

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text.trim();
};

const getRecentMessage = async (
  ConversationId,
  limit = MAX_MESSAGES_IN_CONTEXT
) => {
  const messages = await Message.find({ conversation: ConversationId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .sort({ timestamp: 1 });

  console.log(
    "Your ai is using this amount of messages for context",
    messages.length
  );

  return messages;
};

exports.createMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const userMessage = await Message.create({
      text: req.body.text,
      sender: "User",
      conversation: id,
    });

    const conversationHistory = await getRecentMessage(
      id,
      MAX_MESSAGES_IN_CONTEXT
    );

    const formattedHistory = conversationHistory.map((msg) => ({
      role: msg.sender === "User" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    formattedHistory.push({
      role: "user",
      parts: [{ text: req.body.text }],
    });

    console.log(conversationHistory.length);

    if (conversationHistory.length >= 2) {
      try {
        const title = await generateTitle(userMessage.text);
        await Conversation.findByIdAndUpdate(id, {
          title: title || `Chat -${new Date().toLocaleDateString()}`,
        });
        console.log("I am here", title);
      } catch (error) {
        console.log("Title generation failed:", error);
      }
    }

    const response = await botResponse(formattedHistory);
    console.log(response.text);

    const botMessage = await Message.create({
      text: response.text,
      sender: "Bot",
      conversation: id,
    });

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
