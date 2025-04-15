/**
 * BocchiBot German Version - Set Level Command
 * For owners to directly set a user's level with proper XP calculation
 */

const levelling = require('../lib/levelling');
const { getRoleByLevel, getRoleBadge } = require('../lib/role');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Bitte gib das Level an, auf das ein Nutzer gesetzt werden soll.\nBeispiel: *.setlevel @user 50*';
  }

  // Show processing reaction
  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  // Format numbers for better readability
  const formatNumber = (num) => num.toLocaleString('de-DE');

  // Parse the mentioned user and level
  let parts = text.trim().split(/\s+/);
  if (parts.length < 2) {
    throw 'Bitte gib sowohl einen Benutzer als auch ein Level an.\nBeispiel: *.setlevel @user 50*';
  }

  let userMention = parts[0].replace(/[@+]/g, '');
  let mentionedJid = userMention.includes('@s.whatsapp.net') ? userMention : userMention + '@s.whatsapp.net';

  let targetLevel = parseInt(parts[1]);
  if (isNaN(targetLevel)) {
    throw 'Das Level muss eine gültige Zahl sein.\nBeispiel: *.setlevel @user 50*';
  }

  // Validate the level
  const maxLevel = levelling.maxLevel();
  if (targetLevel < 0 || targetLevel > maxLevel) {
    throw `Das Level muss zwischen 0 und ${maxLevel} liegen.`;
  }

  // Get user data
  let users = global.db.data.users;

  // Ensure the user exists in the database
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      exp: 0,
      level: 0,
      role: 'Rekrut ㋡',
      lastclaim: 0
    };
  }

  // Store information before the change
  const beforeXP = users[mentionedJid].exp || 0;
  const beforeLevel = users[mentionedJid].level || 0;
  const beforeRole = users[mentionedJid].role || 'Rekrut ㋡';

  // Calculate the XP required for the target level
  const targetXP = targetLevel > 0 
    ? levelling.xpRange(targetLevel - 1, global.multiplier || 1).max + 1 
    : 0;
  
  // Update the user data
  users[mentionedJid].level = targetLevel;
  users[mentionedJid].exp = targetXP;
  
  // Update role based on new level
  const newRole = getRoleByLevel(targetLevel);
  const roleChanged = newRole !== beforeRole;
  if (roleChanged) {
    users[mentionedJid].role = newRole;
  }

  // Make sure the updated data is saved
  global.db.data.users = users;

  // Get badge for the new level
  const badge = getRoleBadge(targetLevel);
  
  // Create detailed feedback message
  let message = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *LEVEL GESETZT*  ${badge}
╚═══❖•ೋ°❀°ೋ•❖═══╝

✅ @${mentionedJid.split('@')[0]} wurde auf Level *${targetLevel}* gesetzt.

┌─⊷ *BENUTZER STATUS*
│ 
│ 🏅 *Level:* ${beforeLevel} → ${targetLevel}
│ 📊 *XP:* ${formatNumber(beforeXP)} → ${formatNumber(targetXP)}
│ ${roleChanged ? `│ ⭐ *Rolle:* ${beforeRole} → ${newRole}` : `│ ⭐ *Rolle:* ${newRole} (unverändert)`}
│ 
└───────────

ℹ️ Die notwendige XP für dieses Level wurde automatisch angepasst.
`.trim();

  // Send the detailed feedback
  conn.reply(m.chat, message, m, {
    mentions: [mentionedJid]
  });
  
  // Success reaction
  conn.sendMessage(m.chat, {
    react: {
      text: '✅',
      key: m.key,
    }
  });
};

handler.help = ['setlevel @user <Level> - Setzt einen Benutzer direkt auf das angegebene Level. Nur für Bot-Besitzer verfügbar. Die XP werden automatisch angepasst.'];
handler.tags = ['xp', 'owner'];
handler.command = /^(setlevel|setlvl)$/i;
handler.owner = true;

module.exports = handler;