const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Player name is required"],
  },
  level: {
    type: Number,
    default: 0,
  },
  game: {
    type: String,
    required: [true, "You need to specify game"],
  },
  location: {
    type: String,
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
