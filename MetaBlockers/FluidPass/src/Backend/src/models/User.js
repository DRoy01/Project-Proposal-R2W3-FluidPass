const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserEvent",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
