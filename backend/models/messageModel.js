const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: String,
    enum: ["User", "Bot"],
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
