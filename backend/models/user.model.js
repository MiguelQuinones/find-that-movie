const mongoose = require("mongoose");

// Mongoose model for an actual user
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  } )
);

module.exports = User;