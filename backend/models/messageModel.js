const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Message text is required!"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    sender: {
      type: String,
      enum: {
        values: ["User", "Bot"],
        message: "Sender must either be a user or bot",
      },
      required: [true, "Message sender is required"],
      default: "User",
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      ref: "Conversation",
      required: [true, "A conversation Id must be passed"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
