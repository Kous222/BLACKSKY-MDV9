let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
const { createHash } = require('crypto')
const fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix }) => {
  function sanitizeNumber(number) {
    return number.replace(/\s/g, '').replace(/[@+-]/g, '')
  }

  function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000))
    let hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    let minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    return `${days} Tage ${hours} Stunden ${minutes} Minuten`
  }

  text = sanitizeNumber(text)
  let number = isNaN(text) ? text.split`@`[1] : text

  if (!text && !m.quoted) {
    return conn.reply(m.chat, `*❏ NUMMER BEKOMMEN*

• Markiere den Benutzer: *${usedPrefix}profile @Tag*
• Gib die Nummer ein: *${usedPrefix}profile 6289654360447*
• Überprüfe mein Profil: *(Antworten / Antwort auf deine eigene Nachricht)*`, m)
  }

  if (isNaN(number) || number.length > 15) {
    return conn.reply(m.chat, `*❏ UNGÜLTIGE NUMMER*

• Markiere den Benutzer: *${usedPrefix}profile @Tag*
• Gib die Nummer ein: *${usedPrefix}profile 6289654360447*`, m)
  }

  let who = m.quoted ? m.quoted.sender : number + '@s.whatsapp.net'
  let pp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIdvC1Q4WL7_zA6cJm3yileyBT2OsWhBb9Q&usqp=CAU'

  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch (e) {}

  if (typeof global.db.data.users[who] === 'undefined') {
    throw 'Benutzer ist nicht in der Datenbank'
  }

  let user = global.db.data.users[who]
  let now = Date.now()
  let premiumTimeLeft = user.premiumTime > now ? msToDate(user.premiumTime - now) : '*Kein Ablaufdatum für Premium!*'

  // Extract user data
  let { name, pasangan, limit, exp = 0, money = 0, bank = 0, age = 0, level = 0, role = 'Newbie ㋡', registered = false, regTime = 0, premium = false, dailyXP = 0, lastDailyReset = 0 } = user
  
  // Initialize daily XP tracking if not present
  if (typeof dailyXP === 'undefined') user.dailyXP = dailyXP = 0
  if (typeof lastDailyReset === 'undefined') user.lastDailyReset = lastDailyReset = 0
  
  // Check if it's a new day and reset daily XP if needed
  const today = new Date().setHours(0, 0, 0, 0)
  if (lastDailyReset < today) {
    user.dailyXP = dailyXP = 0
    user.lastDailyReset = lastDailyReset = today
  }
  
  // Get daily XP cap (should match the value in _auto-xp.js)
  const DAILY_XP_CAP = 1500
  
  // Get user display info
  let username = conn.getName(who)
  let about = (await conn.fetchStatus(who).catch(() => ({}))).status || ''
  let sn = createHash('md5').update(who).digest('hex')
  let jodoh = pasangan ? `${pasangan}` : 'Single'
  
  // Calculate level and XP info safely with enhanced error handling
  let xpInfo = { min: 0, xp: 1, max: 1 };  // Default values
  try {
    // Make sure we have a valid level and multiplier
    // Cap level at 99 for XP calculation, since level 100 is max
    const safeLevel = Math.min(99, Math.max(0, level || 0));
    const safeMultiplier = Math.max(1, global.multiplier || 1);
    xpInfo = levelling.xpRange(safeLevel, safeMultiplier);
    console.log(`XP calculation for level ${safeLevel}: `, xpInfo);
  } catch (e) {
    console.error('XP calculation error:', e);
  }
  
  // Safely extract XP range values with fallbacks
  let minXP = xpInfo.min !== undefined ? xpInfo.min : 0;
  let requiredXP = xpInfo.xp !== undefined ? xpInfo.xp : 100;
  let maxXP = xpInfo.max !== undefined ? xpInfo.max : minXP + requiredXP;
  
  // Safe calculations for current level progress with typecasting to avoid NaN
  const safeExp = Number(exp) || 0;
  
  // Special handling for level 100 (max level)
  const isMaxLevel = level >= 100;
  let currentXP, xpLeft;
  
  if (isMaxLevel) {
    // At max level, show 100% progress
    currentXP = requiredXP;
    xpLeft = 0;
  } else {
    // Normal level progress calculation
    currentXP = Math.max(0, safeExp - minXP);
    xpLeft = Math.max(0, maxXP - safeExp);
  }
  
  // Calculate progress percentage with safety checks
  let progressPercent = 0;
  if (requiredXP > 0) {
    progressPercent = Math.min(100, Math.floor((currentXP / requiredXP) * 100));
  } else if (xpLeft <= 0) {
    progressPercent = 100;
  }
  
  // Create a visual progress bar
  let progressBar = '';
  let barLength = 15;
  let filledLength = Math.floor((progressPercent / 100) * barLength);
  
  for (let i = 0; i < barLength; i++) {
    progressBar += i < filledLength ? '█' : '░';
  }

  let profileText = `
┌─⊷ *PROFIL*
👤 • Benutzername: ${username} ${registered ? `(${name})` : ''} (@${who.split`@`[0]})
👥 • Über: ${about}
🏷 • Status: ${jodoh}
📞 • Nummer: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
🔢 • Seriennummer: ${sn}
🔗 • Link: https://wa.me/${who.split`@`[0]}
👥 • Alter: ${registered ? age : ''}
└──────────────

┌─⊷ *LEVEL & ROLLE*
🏅 • Level: ${level}
⭐ • Rolle: *${role}*
└──────────────

┌─⊷ *XP FORTSCHRITT*
🔰 • XP: ${currentXP} / ${requiredXP} (Total: ${exp})
📊 • ${progressBar} ${progressPercent}%
${isMaxLevel ? `🏆 *MAXIMALES LEVEL ERREICHT!* Herzlichen Glückwunsch!` : (xpLeft <= 0 ? `✅ Bereit für *${usedPrefix}levelup*` : `⏳ ${xpLeft} XP übrig bis zum nächsten Level`)}
🕒 • Heute: ${dailyXP}/${DAILY_XP_CAP} XP (${DAILY_XP_CAP > 0 ? Math.floor((dailyXP/DAILY_XP_CAP)*100) : 0}% des Tageslimits)
ℹ️ • Verwende *${usedPrefix}dailyxp* für Details
└──────────────

┌─⊷ *RESSOURCEN*
💰 • Geld: ${money}
🔮 • Limit: ${limit}
└──────────────

┌─⊷ *STATUS*
📑 • Registriert: ${registered ? `Ja (${new Date(regTime).toLocaleString()})` : 'Nein'}
🌟 • Premium: ${premium ? 'Ja' : 'Nein'}
⏰ • PremiumZeit: ${premiumTimeLeft}
└──────────────`.trim()

  let mentionedJid = [who]
  conn.sendFile(m.chat, pp, 'pp.jpg', profileText, m, false, {
    contextInfo: { mentionedJid: conn.parseMention(profileText) }
  })
}

handler.help = ['profile [@user]']
handler.tags = ['info']
handler.command = /^profile$/i
handler.limit = true
handler.register = false
handler.group = true

module.exports = handler
