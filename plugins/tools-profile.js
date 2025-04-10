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
  let { name, pasangan, limit, exp = 0, money = 0, bank = 0, age = 0, level = 0, role = 'Newbie ㋡', registered = false, regTime = 0, premium = false } = user
  
  // Get user display info
  let username = conn.getName(who)
  let about = (await conn.fetchStatus(who).catch(() => ({}))).status || ''
  let sn = createHash('md5').update(who).digest('hex')
  let jodoh = pasangan ? `${pasangan}` : 'Single'
  
  // Calculate level and XP info safely
  let xpInfo = { min: 0, xp: 1, max: 1 };  // Default values
  try {
    xpInfo = levelling.xpRange(level || 0, global.multiplier || 1);
  } catch (e) {
    console.error('XP calculation error:', e);
  }
  
  // Safely extract XP range values
  let minXP = xpInfo.min || 0;
  let requiredXP = xpInfo.xp || 1;
  let maxXP = xpInfo.max || 1;
  
  // Safe calculations for current level progress
  let currentXP = Math.max(0, (exp || 0) - minXP);
  let xpLeft = Math.max(0, maxXP - (exp || 0));
  
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
${xpLeft <= 0 ? `✅ Bereit für *${usedPrefix}levelup*` : `⏳ ${xpLeft} XP übrig bis zum nächsten Level`}
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
