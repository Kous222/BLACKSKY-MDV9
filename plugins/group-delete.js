let handler = async (m, { conn, participants }) => {
  if (!m.isGroup) throw '❗ Dieser Befehl funktioniert nur in Gruppen.'  // Ensure the command is used in a group.

  // Fetch group participants metadata
  const sender = participants.find(p => p.id === m.sender);
  const bot = participants.find(p => p.id === conn.user.jid);

  if (!sender?.admin) throw '❌ Nur Gruppen-Admins können diesen Befehl verwenden.'  // Ensure the sender is an admin
  if (!bot?.admin) throw '❌ Ich benötige Adminrechte, um Nachrichten zu löschen.'  // Ensure the bot has admin rights

  // Ensure the message is quoted
  if (!m.quoted) throw '⚠️ Bitte antworte auf die Nachricht eines Admins, um sie zu löschen.'  // If no quoted message exists

  // Ensure that the quoted message has a valid key for deletion
  const quotedMessageKey = m.quoted.key;
  if (!quotedMessageKey || !quotedMessageKey.id) {
    throw '❌ Die Nachricht hat keinen gültigen Schlüssel zum Löschen.';  // Error if key is missing
  }

  // Ensure the quoted message sender is an admin
  const target = m.quoted.sender;
  const targetIsAdmin = participants.find(p => p.id === target)?.admin;
  if (!targetIsAdmin) throw '❌ Nur Nachrichten von Admins können mit diesem Befehl gelöscht werden.';  // Ensure only admins' messages can be deleted

  try {
    // Attempt to delete the quoted message using the message key
    await conn.sendMessage(m.chat, {
      delete: quotedMessageKey
    });

    // Respond with a success message
    await conn.sendMessage(m.chat, {
      text: `✅ Nachricht von @${target.split('@')[0]} wurde erfolgreich gelöscht.`,
      mentions: [target]
    });
  } catch (e) {
    // If there was an error while deleting, log and send an error message
    console.error('Fehler beim Löschen der Nachricht:', e);
    throw '❌ Beim Löschen ist ein Fehler aufgetreten.';  // Error handling
  }
};

handler.help = ['del'];
handler.tags = ['group'];
handler.command = /^(del|löschen)$/i;

handler.group = true;
handler.botAdmin = true;  // Bot needs admin rights to delete messages

module.exports = handler;
