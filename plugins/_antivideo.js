exports.before = async function(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;
    
    let chat = global.db.data.chats[m.chat];
    let sender = global.db.data.chats[m.sender];
    let isVideo = m.mtype;
    let löschen = m.key.participant;
    let bang = m.key.id;
    
    if (chat.antivideo && isVideo) {
      if (isVideo === "videoMessage") {
        if (isAdmin || !isBotAdmin) {
          // Wenn pengirim ist Admin oder Bot nicht Admin, nicht durchführen was-was
        } else {
          m.reply(`*Video Terdeteksi*\n\nEntschuldigung Aber Muss Ich delete, Karna Admin/Owner Mengaktifkan Anti Video Für Chat Dies`);
          return this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: löschen } });
        }
        return true;
      }
    }
    return true;
  };
  