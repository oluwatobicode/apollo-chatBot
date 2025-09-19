const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "Please enter your name!"],
    trim: true,
  },

  lastName: {
    type: String,
    require: [true, "Please enter your name!"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Please enter your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    require: [true, "Please enter a password!"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please enter a password"],
    minLength: 8,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Your password are not the same!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  country: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// hashing our password
// we would first check if the password has been modified if it has not we would procced
// then we would directly modify the password by using the hashSync() and giving it a salt round of 10
// Hash password before saving to database
// Only hash if password field has been modified (new user or password change)
// Use async bcrypt.hash() to avoid blocking the event loop
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

// USER SCHEMA METHODS (EVERYTHING BELOW HERE)

// in here we are comparing passwords, because the password in our db is hashed
// we would take in the candidatePassword (which is the password that was passed in)
// with the userPassword (which is the password that was passed in)
// this would return either true or false
userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
