const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  wallet: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  organizationName: String,
  verificationStatus: {
    type: Boolean,
    default: false,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("Organizer", organizerSchema);
