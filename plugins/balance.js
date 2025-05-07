const { getBalance } = require('../lib/bank'); // Ensure the getBalance function interacts with the new bank system

let handler = async (m, { conn }) => {
  // Fetch the user's balance using the new bank system (MongoDB or another DB solution)
  let balance = await getBalance(m.sender); // Make sure this is an async function
  
  // Send the balance information to the chat
  await conn.sendMessage(m.chat, {
    text: `🏦 *Kontostand*\n\n💳 Du hast aktuell *${balance} Münzen* auf deinem Konto.\n\n💡 Bleib aktiv, um noch reicher zu werden!`,
  }, { quoted: m });
};

handler.command = ['balance', 'bal', 'kontostand'];  // Commands for checking balance
handler.help = ['balance'];  // Help message for the command
handler.tags = ['economy'];  // Tagging it for the economy section

module.exports = handler;
