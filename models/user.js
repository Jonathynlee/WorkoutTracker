const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name this exercise"
  },
  qty: {
    type: Number,
    required: "Enter the number you did"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", exerciseSchema);

module.exports = User;
