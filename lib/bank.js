const mongoose = require('mongoose');

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  sender: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  lastDaily: { type: Number, default: 0 },
  inventory: {
    schwert: { type: Number, default: 0 },
    diamant: { type: Number, default: 0 },
    trank: { type: Number, default: 0 }
  }
});

userSchema.index({ sender: 1 });

const User = mongoose.model('User', userSchema);

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://User:Hahaha33.@cluster0.udprdq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (e) {
    console.error('Failed to connect to MongoDB', e);
  }
}

async function initUser(id) {
  const userId = id.split('@')[0];
  let user = await User.findOne({ sender: userId });
  if (!user) {
    user = new User({ sender: userId });
    await user.save();
  }
  return user;
}

async function getBalance(id) {
  const user = await initUser(id);
  return user.balance;
}

async function addBalance(id, amount) {
  const user = await initUser(id);
  user.balance += amount;
  await user.save();
}

async function subtractBalance(id, amount) {
  const user = await initUser(id);
  user.balance -= amount;
  if (user.balance < 0) user.balance = 0;
  await user.save();
}

async function getLastDaily(id) {
  const user = await initUser(id);
  return user.lastDaily;
}

async function setLastDaily(id, timestamp) {
  const user = await initUser(id);
  user.lastDaily = timestamp;
  await user.save();
}

async function getItemCount(id, item) {
  const user = await initUser(id);
  return user.inventory[item] || 0;
}

async function addItem(id, item, amount) {
  const user = await initUser(id);
  user.inventory[item] = (user.inventory[item] || 0) + amount;
  await user.save();
}

async function removeItem(id, item, amount) {
  const user = await initUser(id);
  if ((user.inventory[item] || 0) < amount) throw new Error(`Nicht genug ${item}`);
  user.inventory[item] -= amount;
  await user.save();
}

module.exports = {
  connectDB,
  getBalance,
  addBalance,
  subtractBalance,
  getLastDaily,
  setLastDaily,
  initUser,
  getItemCount,
  addItem,
  removeItem
};
