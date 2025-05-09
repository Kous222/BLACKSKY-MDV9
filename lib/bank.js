const mongoose = require('mongoose');

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  sender: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  lastDaily: { type: Number, default: 0 }
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
    const userId = id.split('@')[0]; // Extract the sender ID from the input (i.e., 4915562378343@s.whatsapp.net)
    let user = await User.findOne({ sender: userId });
    
    if (!user) {
      user = new User({ sender: userId });
      await user.save();
    }
    return user;
  } catch (e) {
    console.error('Error initializing user:', e);
    throw e; // Rethrow error to be handled elsewhere
  }
}

// Kontostand abrufen
async function getBalance(id) {
  try {
    const user = await initUser(id); // Ensure user is initialized
    return user.balance;
  } catch (e) {
    console.error('Error getting balance:', e);
    throw e;
  }
}

// Geld hinzufügen
async function addBalance(id, amount) {
  try {
    const user = await initUser(id); // Ensure user is initialized
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
    const user = await initUser(id); // Ensure user is initialized
    user.balance -= amount;
    if (user.balance < 0) user.balance = 0;
    await user.save();
  } catch (e) {
    console.error('Error subtracting balance:', e);
    throw e;
  }
}

// Letzten Daily Bonus abfragen
async function getLastDaily(id) {
  try {
    const user = await initUser(id); // Ensure user is initialized
    return user.lastDaily;
  } catch (e) {
    console.error('Error getting last daily:', e);
    throw e;
  }
}

// Timestamp für Daily Bonus setzen
async function setLastDaily(id, timestamp) {
  try {
    const user = await initUser(id); // Ensure user is initialized
    user.lastDaily = timestamp;
    await user.save();
  } catch (e) {
    console.error('Error setting last daily:', e);
    throw e;
  }
}

module.exports = {
  connectDB,
  getBalance,
  addBalance,
  subtractBalance,
  getLastDaily,
  setLastDaily,
  initUser // Export initUser so it can be used in other files
};
