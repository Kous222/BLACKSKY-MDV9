exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return;
  let chat = global.db.data.chats[m.chat]
  let isFoto = m.mtype
  if (chat.antiFoto && isFoto ) {
    if (isAdmin || !isBotAdmin) {
      // Wenn pengirim ist Admin oder Bot nicht Admin, nicht durchführen was-was
    } else {
    if(isFoto === "imageMessage")	 
      await this.sendMessage(m.chat, { delete: m.key });
      return true
    }
  }
  return true
}