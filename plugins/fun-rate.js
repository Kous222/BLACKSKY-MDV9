let handler = async (m, { args, conn }) => {
    if (!args.length) return conn.reply(m.chat, "Gib etwas zum Bewerten ein!\nBeispiel: *.rate wie gut passen ich und sie zusammen*", m);

    // Erzeugt eine Zufallszahl zwischen 1 - 100
    let rating = Math.floor(Math.random() * 100) + 1;

    // Nachrichtenformat
    let text = `✨ *Frage:* ${args.join(" ")}\n📊 *response:* ${rating}%`;

    // response senden
    conn.reply(m.chat, text, m);
}

handler.help = ['rate']
handler.tags = ['fun']
handler.command = /^(rate|bewerten|passend|wie)$/i
handler.group = true
handler.limit = true
handler.fail = null

module.exports = handler
