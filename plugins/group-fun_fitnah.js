let PhoneNumber = require('awesome-phonenumber')
const { createHash } = require('crypto')

let handler = async (m, { conn, text }) => {
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const fitnahMessages = [
    "ati ati bro @user suka coli",
    "eh, tau nggak? @user oft Schulden macht nggak bayar",
    "oh, @user katanya ketahuan ngintip kamar mandi tetangga",
    "bro, hati-hati gleich @user, er/sie mag essen nggak bayar",
    "@user, katanya du jago joget TikTok ya?",
    "anjay, @user hobinya schlafen in klasse",
    "dein Gesicht @user sieht aus wie ein Trottel",
    "tau nggak? @user kemarin ketahuan curhat zu kucing.",
    "@user, katanya kemarin dipanggil guru weil schlafen in meja",
    "eh, nicht-nicht @user oft stiehlt Wifi tetangga?",
    "verrückt, @user hat anscheinend tausende Memes gesammelt",
    "@user pernah essen bakso bayar verwenden daun",
    "oh, katanya @user ketahuan nge-stalk mantan semalaman",
    "@user, kemarin disuruh nyanyi stattdessen singt lagu iklan",
    "anjir, @user hobi banget rebutan colokan in klasse",
    "tau nggak? @user falls in kantin suka ngambil gorengan früher neu bayar 3 Tag kemudian",
    "gokil, @user ternyata haben akun fake erstellen stalking gebetan",
    "bro, katanya @user pernah ketahuan nangis gara-gara verlieren spielen spiel",
    "parah, @user kemarin ngaku-ngaku also selebgram obwohl es nur Follower 10",
    "woy @user, nicht suka mandi nur wenn wiederholt Jahr aja dong",
    "eh, katanya @user suka schlafen sambil ngorok keras banget bis tetangga kebangun",
    "tau nggak? @user ternyata oft Status erstellt galau jeden malem",
    "oh, @user falls ditagih utang suka pura-pura lupa",
    "gila, @user hobinya ngakak selbst pas baca chat",
    "@user, kemarin ngaku-ngaku haben mobil, pas dicek nur Spielzeug remote control",
    "bro, hati-hati gleich @user, er/sie leiht gerne artikel terus lupa balikin",
    "@user suka banget ngedraft chat lang, aber nggak pernah disenden",
    "anjay, @user ternyata suka karaoke lagu anak-anak in kamar mandi",
    "oh, katanya @user pernah nulis surat cinta terus malu selbst",
    "tau nggak? @user kemarin zu warung stattdessen vergisst bawa Geld",
    "@user oft banget hochladen story essen obwohl das Essen person andere"
  ]

  if (!m.isGroup) return conn.reply(m.chat, 'Funktion dies nur kann benutzt in in Gruppe!', m)

  const participants = (await conn.groupMetadata(m.chat)).participants

  let randomUser = null;

  if (!text) {
    randomUser = getRandomElement(participants).id
  } else {
    const mentionedUser = text.match(/@([0-9]{7,16})/);  // Regex für menangkap mention id
    if (mentionedUser) {
      const mentionedUserId = mentionedUser[1]
      randomUser = participants.find(user => user.id.includes(mentionedUserId))?.id
    }
  }

  if (!randomUser) return conn.reply(m.chat, 'Der erwähnte Nutzer wurde nicht gefunden!', m)

  const selectedMessage = getRandomElement(fitnahMessages).replace(/@user/g, `@${randomUser.split('@')[0]}`)

  conn.reply(m.chat, selectedMessage, m, { mentions: [randomUser] })
}

handler.help = ['fitnah']
handler.tags = ['fun']
handler.command = /^fitnah$/i
handler.group = true

module.exports = handler
