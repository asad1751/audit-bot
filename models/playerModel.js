const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  discordId: String,
  playerTag: String,
  playerClubTag: String
});

const Player = mongoose.model('player',playerSchema);

module.exports = Player;
