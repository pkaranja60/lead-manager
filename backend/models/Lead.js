const mongoose = require("mongoose");

const LEAD_STATUSES = [
  "New",
  "Engaged",
  "Proposal Sent",
  "Closed-Won",
  "Closed-Lost",
];

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  status: {
    type: String,
    enum: LEAD_STATUSES,
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", leadSchema);
module.exports.LEAD_STATUSES = LEAD_STATUSES;
