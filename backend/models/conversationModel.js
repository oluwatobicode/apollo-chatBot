const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
      default: "New conversation",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A user must be included"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

conversationSchema.virtual("messages", {
  ref: "Message",
  foreignField: "conversation",
  localField: "_id",
  options: { sort: { timestamp: 1 } },
});

// this helps in updating the updatedAT field before saving
conversationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
