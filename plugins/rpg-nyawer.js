let handler = async(m, { groupMetadata, command, conn, text, args, usedPrefix }) => {
    //if (!Number(text)) throw 'Anmeldenkan Angka';
    if (!args[0] || isNaN(args[0])) {
		throw '*Example*: .sawer 1000';
	};
	let count = parseInt(args[0]);
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps[Math.floor(Math.random() * ps.length)]; // Memilih in einer Weise acak peserta von array ps
    let name = await conn.getName(m.sender);
    let user = global.db.data.users[m.sender];
    let aa = global.db.data.users[a];
    
    if (user.Münzen < count) return m.reply(`Münzen du nicht genug für sawer sebanyak ${count}`)

    let hsl = `*@${a.split`@`[0]}* du erhalten saweran von @${m.sender.split`@`[0]} etwa *${count}* `;
    user.Münzen -= count;
    aa.Münzen += count;

    conn.reply(m.chat, hsl, m);
}

handler.help = ['sawer'];
handler.tags = ['rpg'];
handler.command = /^(sawer|nyawer)$/i;
handler.group = true;
handler.rpg = true;
module.exports = handler;