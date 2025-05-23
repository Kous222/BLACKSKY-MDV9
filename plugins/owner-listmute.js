let handler = async (m, { conn, args }) => {
    let chats = global.db.data.chats;
    let mutedChats = Object.entries(chats).filter(([_, chat]) => chat.isBanned);
  
    if (mutedChats.length === 0) {
      return m.reply('✅ Nein gibt Gruppe das/der/die gerade in-mute.');
    }
    if (args[0]) {
      let index = parseInt(args[0]) - 1;
      if (isNaN(index) || index < 0 || index >= mutedChats.length) {
        return m.reply('❌ Nomor das/der/die du eingeben nicht valid.');
      }
  
      let [chatId] = mutedChats[index];
      chats[chatId].isBanned = false;
      m.reply(`✅ erfolgreich meng-unmute Gruppe mit id: ${chatId}\n\nBitte Cek List Mute Neueste Mit Data Neueste`);
    } else {
      let message = '*🔒 register Gruppe das/der/die Stummgeschaltet:*\n\n';
  
      for (let i = 0; i < mutedChats.length; i++) {
        let [chatId] = mutedChats[i];
        try {
          let metadata = await conn.groupMetadata(chatId);
          let groupName = metadata.subject;
          message += `*${i + 1}. ${groupName}*\n`;
          message += `- *id Gruppe:* ${chatId}\n\n`;
        } catch (e) {
          message += `*${i + 1}. [Name Gruppe nicht gefunden]*\n`;
          message += `- *id Gruppe:* ${chatId}\n\n`;
        }
      }
  
      message += `Tippe *listmute [nomor]* für meng-unmute Gruppe bestimmt.`;
      m.reply(message);
    }
  };
  
  handler.help = ['listmute'];
  handler.tags = ['owner'];
  handler.command = ['listmute'];
  handler.owner = true;
  
  module.exports = handler;
  