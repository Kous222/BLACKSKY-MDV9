const mongoose = require('mongoose');

// Define the Rank schema
const rankSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  rank: { type: String, required: true }
});

const Rank = mongoose.model('Rank', rankSchema);

// Valid ranks (can be expanded as necessary)
const validRanks = ['support', 'moderator', 'manager', 'teamleiter'];

// Set a user's rank, validate against valid ranks
async function setUserRank(userJid, rank) {
  if (!validRanks.includes(rank)) {
    throw new Error(`Ungültiger Rang. Erlaubte Ränge sind: ${validRanks.join(', ')}`);
  }
  
  return Rank.findOneAndUpdate({ user: userJid }, { rank }, { upsert: true, new: true });
}

// Get a user's rank, return 'Kein Rang' if not found
async function getUserRank(userJid) {
  try {
    const doc = await Rank.findOne({ user: userJid });
    return doc?.rank || 'user'; // Default rank is 'user'
  } catch (error) {
    throw new Error('Fehler beim Abrufen des Rangs');
  }
}

// Delete a user's rank
async function deleteUserRank(userJid) {
  try {
    return await Rank.deleteOne({ user: userJid });
  } catch (error) {
    throw new Error('Fehler beim Löschen des Rangs');
  }
}

module.exports = { setUserRank, getUserRank, deleteUserRank };
