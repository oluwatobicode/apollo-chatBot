const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Kindly provide a token"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Kindly provide a user email"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 86400,
  },
});
