let { groupsSettingUpdate } = require('@adiwajshing/baileys')
let handler = async (m, { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command }) => {
	if (!(isAdmin || isOwner)) {
		global.dfail('Admin', m, conn)
		throw false
	}
	if (!isBotAdmin) {
		global.dfail('botAdmin', m, conn)
		throw false
	}
let prefix = usedPrefix
let bu = `Group hat in buka durch @${m.sender.split`@`[0]} und jetzt  alle member kann senden nachricht
ketik *${usedPrefix}group buka*
Für öffnen Gruppe!`.trim()            
    
	let isClose = {
		'open': 'not_announcement',
		'buka': 'not_announcement',
		'on': 'not_announcement',
		'1': 'not_announcement',
		'close': 'announcement',
		'tutup': 'announcement',
		'off': 'announcement',
		'0': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined) {
var text5 = `beispiel:
${usedPrefix + command} tutup
${usedPrefix + command} buka
	`
m.reply(text5)

		throw false
	} else if (isClose === 'announcement') {
	await conn.groupSettingUpdate(m.chat, isClose)
	let teks = `Group hat in tutup durch @${m.sender.split`@`[0]} und jetzt nur Admin das/der/die kann senden nachricht
ketik *${usedPrefix}group buka*
Für öffnen Gruppe!`.trim()
	await m.reply(teks)
	} else if (isClose === 'not_announcement') {
	await conn.groupSettingUpdate(m.chat, isClose)
	await m.reply(bu)
	} else if (isClose === undefined) {

var te = `
beispiel:
${usedPrefix + command} tutup
${usedPrefix + command} buka`

m.reply(te)

	}
}

handler.help = ['Gruppe <open/close>']
handler.tags = ['group']
handler.command = /^(g(ro?up|c?)?)$/i
handler.group = true
handler.botAdmin = false

module.exports = handler
