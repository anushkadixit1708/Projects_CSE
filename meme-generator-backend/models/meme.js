const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  url: {
      type: String,
      required: true
  },
  memes: [{
    url: String,
    textArray: [String]
    }]
});

module.exports = mongoose.model("user", userSchema);