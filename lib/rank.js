const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  rank: { type: String, required: true }
});

const Rank = mongoose.model('Rank', rankSchema);

async function setUserRank(userJid, rank) {
  return Rank.findOneAndUpdate({ user: userJid }, { rank }, { upsert: true, new: true });
}

async function getUserRank(userJid) {
  const doc = await Rank.findOne({ user: userJid });
  return doc?.rank || 'Kein Rang';
}

async function deleteUserRank(userJid) {
  return Rank.deleteOne({ user: userJid });
}

module.exports = { setUserRank, getUserRank, deleteUserRank };
