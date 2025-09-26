const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    timeStamp: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    message: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
