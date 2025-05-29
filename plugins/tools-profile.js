/**
 * BocchiBot German Version - User Profile
 * Enhanced profile display with visual indicators for XP, level and role
 */

const PhoneNumber = require('awesome-phonenumber')
const levelling = require('../lib/levelling')
const { createHash } = require('crypto')
const fetch = require('node-fetch')
const { getRoleBadge, getLevelColor, getRoleByLevel } = require('../lib/role')
const { initUser } = require('../lib/bank')  // Neu: Bank-System importieren

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

  function formatNumber(num) {
    return num.toLocaleString('de-DE')
  }

  text = sanitizeNumber(text)
  let number = isNaN(text) ? text.split`@`[1] : text

  let who = m.sender
  if (text || m.quoted) {
    if (text && (isNaN(number) || number.length > 15)) {
      return conn.reply(m.chat, `*❏ UNGÜLTIGE NUMMER*

• Markiere den Benutzer: *${usedPrefix}profile @Tag*
• Gib die Nummer ein: *${usedPrefix}profile 491234567890*`, m)
    }
    who = m.quoted ? m.quoted.sender : number + '@s.whatsapp.net'
  }

  let pp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIdvC1Q4WL7_zA6cJm3yileyBT2OsWhBb9Q&usqp=CAU'
  try {
    pp = await conn.profilePictureUrl(who, 'image')
  } catch (e) {}

  if (!global.db.data) throw 'Datenbank nicht initialisiert! Bitte starte den Bot neu.'

  // Initialisiere User in globaler DB, falls noch nicht vorhanden
  if (typeof global.db.data.users[who] === 'undefined') {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: conn.getName(who),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: '',
      banned: false,
      level: 0,
      role: 'Rekrut ㋡',
      autolevelup: true,
      dailyXP: 0,
      lastDailyReset: 0,
      totalMessages: 0,
      premium: false,
      premiumTime: 0,
      pasangan: null,
      about: '',
      money: 0,  // placeholder, wird gleich überschrieben
      bank: 0    // placeholder, wird gleich überschrieben
    }
  }

  // Lade User-Daten aus globaler DB
  let user = global.db.data.users[who]

  // Lade Bank-Daten aus neuem Bank-System
  let bankUser = await initUser(who)
  user.money = bankUser.balance || 0   // cash
  user.bank = bankUser.bank || 0       // bank balance

  let now = Date.now()
  let premiumTimeLeft = user.premiumTime > now ? msToDate(user.premiumTime - now) : '*Kein Ablaufdatum für Premium!*'

  let {
    name,
    pasangan,
    limit,
    exp = 0,
    money = 0,
    bank = 0,
    age = 0,
    level = 0,
    role = 'Rekrut ㋡',
    registered = false,
    regTime = 0,
    premium = false,
    dailyXP = 0,
    lastDailyReset = 0,
    totalMessages = 0,
    autolevelup = true,
    about = ''
  } = user

  if (typeof dailyXP === 'undefined') user.dailyXP = dailyXP = 0
  if (typeof lastDailyReset === 'undefined') user.lastDailyReset = lastDailyReset = 0
  if (typeof totalMessages === 'undefined') user.totalMessages = totalMessages = 0
  if (typeof autolevelup === 'undefined') user.autolevelup = autolevelup = true

  const today = new Date().setHours(0, 0, 0, 0)
  if (lastDailyReset < today) {
    user.dailyXP = dailyXP = 0
    user.lastDailyReset = lastDailyReset = today
  }

  const DAILY_XP_CAP = 3000

  const calculatedLevel = levelling.findLevel(exp, global.multiplier || 1)
  const canLevelUp = calculatedLevel > level
  const oldLevel = level
  let levelUpdated = false
  if (calculatedLevel !== level) {
    user.level = level = calculatedLevel
    levelUpdated = true
    console.log(`[PROFILE-SYNC] Updated user level: ${who} from ${oldLevel} to ${calculatedLevel}`)
  }

  const oldRole = role
  const correctRole = getRoleByLevel(calculatedLevel)
  if (correctRole !== role) {
    user.role = role = correctRole
    console.log(`[PROFILE-SYNC] Updated user role: ${who} from ${oldRole} to ${correctRole}`)
  }

  const progress = levelling.getProgressData(level, exp, global.multiplier || 1)
  const { progressBar, progressPercent, currentXP, xpRequired, xpLeft } = progress

  let username = await conn.getName(who)
  if (!about) {
    about = (await conn.fetchStatus(who).catch(() => ({}))).status || ''
  }
  let sn = createHash('md5').update(who).digest('hex')
  let relationship = pasangan ? `${pasangan}` : 'Single'

  const badge = getRoleBadge(user.level)
  // levelColor ist nicht verwendet, kannst du weiter nutzen falls gewünscht
  // const levelColor = getLevelColor(user.level)

  const fExp = formatNumber(exp)
  const fCurrentXP = formatNumber(currentXP)
  const fRequired = formatNumber(xpRequired)
  const fLeft = formatNumber(xpLeft)
  const fMoney = formatNumber(money)
  const fBank = formatNumber(bank)
  const fLimit = formatNumber(limit)
  const fDailyXP = formatNumber(dailyXP)
  const fDailyXPCap = formatNumber(DAILY_XP_CAP)
  const fMessages = formatNumber(totalMessages)

  let bonusesText = ''
  if (premium) bonusesText += `✨ *Premium-Bonus:* 30% mehr XP\n`
  if (new Date().getDay() === 0) bonusesText += `🌟 *Sonntags-Bonus:* 50% mehr XP heute\n`

  let profileText = `
╔═══❖•ೋ°❀°ೋ•❖═══╗
   *BENUTZER PROFIL*  ${badge}
╚═══❖•ೋ°❀°ೋ•❖═══╝

┌─⊷ *PERSÖNLICHE DATEN*
│ 
│ 👤 *Name:* ${username} ${registered ? `(${name})` : ''}
│ 🏷️ *ID:* @${who.split`@`[0]}
│ 💭 *Über:* ${about || 'Keine Info'}
│ 💌 *Status:* ${relationship}
│ 📞 *Nummer:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
│ 🌐 *Link:* wa.me/${who.split`@`[0]}
│ ${registered ? `👤 *Alter:* ${age} Jahre` : ''}
│ 📨 *Nachrichten:* ${fMessages}
│ 
└───────────

┌─⊷ *LEVEL & FORTSCHRITT*
│ 
│ ${badge} *Level:* ${user.level}${levelUpdated ? ` (Aktualisiert von ${oldLevel})` : ''}
│ 🏅 *Rolle:* ${user.role}${correctRole !== oldRole ? ` (Aktualisiert)` : ''}
│ 
│ 📊 *Fortschritt: ${progressPercent}%*
│ ${progressBar}
│ 
│ 💫 *XP:* ${fCurrentXP} / ${fRequired}
│ 📚 *Gesamt XP:* ${fExp}
│ ${xpLeft > 0 ? `🔄 *Benötigt:* ${fLeft} XP bis Level ${user.level + 1}` : '🏆 *Level komplett!*'}
│ 
│ 📆 *Heute:* ${fDailyXP}/${fDailyXPCap} XP (${DAILY_XP_CAP > 0 ? Math.floor((dailyXP / DAILY_XP_CAP) * 100) : 0}% Tagesgrenze)
│ ${bonusesText ? `│ ${bonusesText.trim().replace(/\n/g, '\n│ ')}` : ''}
│ 🤖 *Auto-Level:* ${autolevelup ? 'An ✅' : 'Aus ❌'}
│ 
└───────────

┌─⊷ *RESSOURCEN*
│ 
│ 💰 *Bargeld:* ${fMoney}
│ 🏦 *Bank:* ${fBank}
│ 🔮 *Limit:* ${fLimit}
│ 
└───────────

┌─⊷ *STATUS*
│ 
│ 📋 *Registriert:* ${registered ? `Ja (${new Date(regTime).toLocaleString()})` : 'Nein'}
│ 💎 *Premium:* ${premium ? 'Ja' : 'Nein'}
│ ⏱️ *Premium-Zeit:* ${premium ? premiumTimeLeft : '-'}
│ 
└───────────

*Tipp:* Nutze *.levelup* um im Level aufzusteigen!`.trim()

  conn.sendFile(m.chat, pp, 'pp.jpg', profileText, m, false, {
    contextInfo: { mentionedJid: conn.parseMention(profileText) }
  })
}

handler.help = ['profile [@user]']
handler.tags = ['info']
handler.command = /^profile$/i
handler.exp = 0

module.exports = handler
