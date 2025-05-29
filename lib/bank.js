const mongoose = require('mongoose');

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  sender: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  lastDaily: { type: Number, default: 0 },
  lastWeekly: { type: Number, default: 0 },
  lastMonthly: { type: Number, default: 0 },
  lastYearly: { type: Number, default: 0 }
});

// Ensure an index on 'sender' to optimize queries
userSchema.index({ sender: 1 });

const User = mongoose.model('User', userSchema);

// Initialisierung der Verbindung zu MongoDB Atlas
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

// Nutzer initialisieren
async function initUser(id) {
  try {
    const userId = id.split('@')[0];
    let user = await User.findOne({ sender: userId });

    if (!user) {
      user = new User({ sender: userId });
      await user.save();
    }
    return user;
  } catch (e) {
    console.error('Error initializing user:', e);
    throw e;
  }
}

// Kontostand abrufen
async function getBalance(id) {
  try {
    const user = await initUser(id);
    return user.balance;
  } catch (e) {
    console.error('Error getting balance:', e);
    throw e;
  }
}

// Geld hinzufügen
async function addBalance(id, amount) {
  try {
    const user = await initUser(id);
    user.balance += amount;
    await user.save();
  } catch (e) {
    console.error('Error adding balance:', e);
    throw e;
  }
}

// Geld abziehen
async function subtractBalance(id, amount) {
  try {
    const user = await initUser(id);
    user.balance -= amount;
    if (user.balance < 0) user.balance = 0;
    await user.save();
  } catch (e) {
    console.error('Error subtracting balance:', e);
    throw e;
  }
}

// Daily
async function getLastDaily(id) {
  const user = await initUser(id);
  return user.lastDaily;
}

async function setLastDaily(id, timestamp) {
  const user = await initUser(id);
  user.lastDaily = timestamp;
  await user.save();
}

// Weekly
async function getLastWeekly(id) {
  const user = await initUser(id);
  return user.lastWeekly;
}

async function setLastWeekly(id, timestamp) {
  const user = await initUser(id);
  user.lastWeekly = timestamp;
  await user.save();
}

// Monthly
async function getLastMonthly(id) {
  const user = await initUser(id);
  return user.lastMonthly;
}

async function setLastMonthly(id, timestamp) {
  const user = await initUser(id);
  user.lastMonthly = timestamp;
  await user.save();
}

// Yearly
async function getLastYearly(id) {
  const user = await initUser(id);
  return user.lastYearly;
}

async function setLastYearly(id, timestamp) {
  const user = await initUser(id);
  user.lastYearly = timestamp;
  await user.save();
}

module.exports = {
  connectDB,
  initUser,
  getBalance,
  addBalance,
  subtractBalance,
  getLastDaily,
  setLastDaily,
  getLastWeekly,
  setLastWeekly,
  getLastMonthly,
  setLastMonthly,
  getLastYearly,
  setLastYearly
};
