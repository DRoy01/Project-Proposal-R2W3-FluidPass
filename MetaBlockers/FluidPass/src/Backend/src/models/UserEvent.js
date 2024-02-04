const mongoose = require("mongoose");

const userEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: ["Attending", "Attended", "Cancelled"],
    default: "Attending",
  },
});

module.exports = mongoose.model("UserEvent", userEventSchema);
