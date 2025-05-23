let handler = async (m, { conn, command, usedPrefix }) => {
  // Define the website URL
  const websiteURL = "https://blacksky-md-website.vercel.app/contact"  // Replace with your actual website URL

  // Create the message to send to the user
  const message = `🌐 Besuche unsere Website für weitere Informationen und Unterstützung:\n\n${websiteURL}`;

  // Send the message to the chat
  await conn.sendMessage(m.chat, {
    text: message,
  });
};

handler.help = ['website', 'site', 'web'];  // You can add additional commands here
handler.tags = ['info'];
handler.command = ['website', 'site', 'web'];  // Commands that will trigger the plugin
handler.owner = false;  // Set to true if you only want the command to be available for the owner

module.exports = handler;
