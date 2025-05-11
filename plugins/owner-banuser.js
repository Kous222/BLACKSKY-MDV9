const User = require('../lib/User'); // Adjust path as needed

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`✳️ Benutze: ${usedPrefix + command} @user <Grund>\nBeispiel: ${usedPrefix + command} @user Spam`);

  let mention = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null) || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  if (!mention) return m.reply(`✳️ Bitte gib einen Benutzer an`);

  let user = await User.findOne({ jid: mention });
  if (!user) {
    user = new User({ jid: mention });
  }

  // prevent banning the owner
  let isOwner = global.owner?.some(o => mention.includes(o.toString()));
  if (isOwner) return m.reply(`❌ Du kannst den Bot-Besitzer nicht bannen.`);

  // Determine duration
  const durationArg = args[1]?.toLowerCase() || '';
  let duration = 0, banType = 'permanent';

  if (durationArg.endsWith('h')) {
    duration = parseInt(durationArg) * 60 * 60 * 1000;
    banType = 'temporary';
  } else if (durationArg.endsWith('d')) {
    duration = parseInt(durationArg) * 24 * 60 * 60 * 1000;
    banType = 'temporary';
  }

  const reason = args.slice(banType === 'permanent' ? 1 : 2).join(' ') || 'Kein Grund angegeben';

  user.banned = true;
  user.bannedTime = banType === 'temporary' ? Date.now() + duration : 0;
  await user.save();

  await m.reply(`✅ *${banType === 'permanent' ? 'Permanenter' : 'Temporärer'} Ban*\n\n• *Benutzer:* @${mention.split('@')[0]}\n• *Grund:* ${reason}`, null, { mentions: [mention] });

  await conn.sendMessage(mention, {
    text: `⚠️ *Du wurdest ${banType === 'permanent' ? 'permanent' : 'temporär'} gebannt*\n\n• *Grund:* ${reason}`
  });

  // Optional: Setup auto-unban via setTimeout (can be unreliable for long durations)
  if (banType === 'temporary' && duration > 0) {
    setTimeout(async () => {
      const u = await User.findOne({ jid: mention });
      if (u?.banned && u.bannedTime <= Date.now()) {
        u.banned = false;
        u.bannedTime = 0;
        await u.save();
        await conn.sendMessage(mention, { text: '✅ Dein temporärer Ban wurde aufgehoben.' });
      }
    }, duration);
  }
};

handler.help = ['ban @user <duration> <reason>'];
handler.tags = ['owner'];
handler.command = /^(ban|b)$/i;
handler.owner = true;

module.exports = handler;
