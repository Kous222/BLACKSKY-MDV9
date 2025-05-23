let handler = async (m, { conn, args }) => {
  let chats = global.db.data.chats;

  // filter Gruppe das/der/die gerade in-mute
  let mutedChats = Object.entries(chats).filter(([_, chat]) => chat.isBanned);

  // Wenn ingin meng-unmute berdasarkan nomor das/der/die diberikan
  if (args[0]) {
    let index = parseInt(args[0]) - 1;
    if (isNaN(index) || index < 0 || index >= mutedChats.length) {
      return m.reply('Nomor das/der/die du eingeben nicht valid.');
    }

    let [chatId] = mutedChats[index];
    chats[chatId].isBanned = false;
    m.reply(`erfolgreich meng-unmute Gruppe mit id: ${chatId}`);
  } else {
    // Anzeigen liste Gruppe das/der/die in-mute
    if (mutedChats.length === 0) {
      m.reply('Nein gibt Gruppe das/der/die gerade in-mute.');
    } else {
      let list = mutedChats.map(([id], i) => `${i + 1}. ${id}`).join('\n');
      m.reply(`register Gruppe das/der/die in-mute:\n\n${list}\n\nTippe *listmute [nomor]* für meng-unmute.`);
    }
  }
};

handler.help = ['listmute'];
handler.tags = ['owner'];
handler.command = ['listmute'];
handler.owner = true;

module.exports = handler;
