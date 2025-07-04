const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }
}, {
  collection: "User"   // ← force Mongoose to use the "User" collection
});

const User = mongoose.model("User", userSchema);
module.exports = User;