let handler = async (m, {
    conn,
    groupMetadata,
    usedPrefix,
    text,
    command
}) => {
if (!text && !m.quoted) return m.reply("Input text\nReply nachricht")
    let get = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
    let count = get.length;
    let sentCount = 0;
    m.reply(wait);
    for (let i = 0; i < get.length; i++) {
        setTimeout(function() {
            if (text) {
                conn.sendMessage(get[i], {
                    text: text
                });
            } else if (m.quoted) {
                conn.copyNForward(get[i], m.getQuotedObj(), false);
            } else if (text && m.quoted) {
                conn.sendMessage(get[i], {
                    text: text + "\n" + m.quoted.text
                });
            }
            count--;
            sentCount++;
            if (count === 0) {
                m.reply(`erfolgreich Push Kontakt:\nJumlah Nachricht Tersenden: *${sentCount}*`);
            }
        }, i * 1000); // delay jeder pengiriman während 1 Sekunden
    }
}
handler.command = handler.help = ['pushkontak']
handler.tags = ['owner']
handler.owner = true
handler.group = true
module.exports = handler
