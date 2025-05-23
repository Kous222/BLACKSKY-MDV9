/**
 * BocchiBot German Version - Remove XP Command
 * For owners to remove XP from users with detailed level information
 */

const levelling = require('../lib/levelling');
const { getRoleByLevel, getRoleBadge } = require('../lib/role');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Bitte gib die Anzahl der XP an, die von einem Nutzer entfernt werden soll.\nBeispiel: *.removexp @user 1000*';
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
    throw 'Bitte gib sowohl einen Benutzer als auch die XP-Menge an.\nBeispiel: *.removexp @user 1000*';
  }

  let userMention = parts[0].replace(/[@+]/g, '');
  let mentionedJid = userMention.includes('@s.whatsapp.net') ? userMention : userMention + '@s.whatsapp.net';

  let pointsToRemove = parseInt(parts[1]);
  if (isNaN(pointsToRemove)) {
    throw 'Die XP-Anzahl muss eine gültige Zahl sein.\nBeispiel: *.removexp @user 1000*';
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

  // Ensure XP doesn't go below 0
  const actualPointsRemoved = Math.min(beforeXP, pointsToRemove);
  
  // Remove the XP
  users[mentionedJid].exp = Math.max(0, beforeXP - pointsToRemove);
  const afterXP = users[mentionedJid].exp;

  // Calculate new level based on XP
  const newLevel = levelling.findLevel(afterXP, global.multiplier || 1);

  // Update user level if it changed
  let levelChanged = false;
  let roleChanged = false;
  
  if (newLevel < beforeLevel) {
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
   *XP ENTFERNT*  ${badge}
╚═══❖•ೋ°❀°ೋ•❖═══╝

❌ *${formatNumber(actualPointsRemoved)}* XP wurden von @${mentionedJid.split('@')[0]} entfernt.

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

handler.help = ['removexp @user <Anzahl> - Entfernt einem Benutzer XP. Nur für Bot-Besitzer verfügbar. Zeigt auch Informationen zu Leveländerungen an.'];
handler.tags = ['xp', 'owner'];
handler.command = /^(removexp|rmxp|xpremove)$/i;
handler.owner = true;

module.exports = handler;