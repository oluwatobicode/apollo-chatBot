const mongoose = require("mongoose");
const validator = require("validator");

const settingsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "Please kindly put in your first Name"],
    trim: true,
  },
  lastName: {
    type: String,
    require: [true, "Please kindly put in your last names"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Kindly put in a valid email!"],
  },
  profilePhoto: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Settings = mongoose.model("Settings", settingsSchema);
module.exports = Settings;
