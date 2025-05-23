/**
 * BocchiBot German Version - Add XP Command
 * For owners to add XP to users with detailed level information
 */

const levelling = require('../lib/levelling');
const { getRoleByLevel, getRoleBadge } = require('../lib/role');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Bitte gib die Anzahl der XP an, die einem Nutzer hinzugefügt werden soll.\nBeispiel: *.addxp @user 1000*';
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

  // Parse the mentioned user and XP amount
  let parts = text.trim().split(/\s+/);
  if (parts.length < 2) {
    throw 'Bitte gib sowohl einen Benutzer als auch die XP-Menge an.\nBeispiel: *.addxp @user 1000*';
  }

  let userMention = parts[0].replace(/[@+]/g, '');
  let mentionedJid = userMention.includes('@s.whatsapp.net') ? userMention : userMention + '@s.whatsapp.net';

  let pointsToAdd = parseInt(parts[1]);
  if (isNaN(pointsToAdd)) {
    throw 'Die XP-Anzahl muss eine gültige Zahl sein.\nBeispiel: *.addxp @user 1000*';
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

  // Add the XP
  users[mentionedJid].exp += pointsToAdd;
  const afterXP = users[mentionedJid].exp;

  // Calculate new level based on XP
  const newLevel = levelling.findLevel(afterXP, global.multiplier || 1);

  // Update user level if it changed
  let levelChanged = false;
  let roleChanged = false;
  
  if (newLevel > beforeLevel) {
    levelChanged = true;
    users[mentionedJid].level = newLevel;
    
    // Update role based on new level
    const newRole = getRoleByLevel(newLevel);
    if (newRole !== beforeRole) {
      roleChanged = true;
      users[mentionedJid].role = newRole;
    }
  }

  // Make sure the updated data is saved
  global.db.data.users = users;

  // Get badge for the new level
  const badge = getRoleBadge(newLevel);
  
  // Create detailed feedback message
  let message = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *XP HINZUGEFÜGT*  ${badge}
╚═══❖•ೋ°❀°ೋ•❖═══╝

✅ *${formatNumber(pointsToAdd)}* XP wurden @${mentionedJid.split('@')[0]} hinzugefügt.

┌─⊷ *BENUTZER STATUS*
│ 
│ 📊 *XP:* ${formatNumber(beforeXP)} → ${formatNumber(afterXP)}
│ ${levelChanged ? `│ 🏅 *Level:* ${beforeLevel} → ${newLevel}` : `│ 🏅 *Level:* ${newLevel} (unverändert)`}
│ ${roleChanged ? `│ ⭐ *Rolle:* ${beforeRole} → ${users[mentionedJid].role}` : `│ ⭐ *Rolle:* ${users[mentionedJid].role} (unverändert)`}
│ 
└───────────
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

handler.help = ['addxp @user <Anzahl> - Fügt einem Benutzer XP hinzu. Nur für Bot-Besitzer verfügbar. Zeigt auch Informationen zu Leveländerungen an.'];
handler.tags = ['xp', 'owner'];
handler.command = /^(addxp|givexp|xpadd)$/i;
handler.owner = true;

module.exports = handler;
