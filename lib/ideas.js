const mongoose = require('mongoose');

// Define Idea schema
const ideaSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  idea: { type: String, required: true },
  timestamp: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }, // Added status field
});

// Create a model for the ideas
const Idea = mongoose.model('Idea', ideaSchema);

// Function to add a new idea
async function addIdea(sender, idea) {
  const newIdea = new Idea({
    sender,
    idea,
    timestamp: Date.now(),
  });
  await newIdea.save();
}

// Function to get all ideas
async function getAllIdeas() {
  return await Idea.find({});
}

// Function to clear all ideas
async function clearIdeas() {
  await Idea.deleteMany({});
}

// Function to accept or decline an idea
async function acceptIdea(ideaId) {
  const idea = await Idea.findById(ideaId);
  if (idea) {
    idea.status = 'accepted'; // Mark as accepted
    await idea.save();
    return idea;
  }
  return null;
}

async function declineIdea(ideaId) {
  const idea = await Idea.findById(ideaId);
  if (idea) {
    idea.status = 'declined'; // Mark as declined
    await idea.save();
    return idea;
  }
  return null;
}

module.exports = { addIdea, getAllIdeas, clearIdeas, acceptIdea, declineIdea };
