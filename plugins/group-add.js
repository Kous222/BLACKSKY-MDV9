const handler = async (m, { conn, text, participants, usedPrefix, command }) => {
    if (!text) throw `_Bitte gib eine Number ein!_\nBeispiel:\n\n${usedPrefix + command} ${global.owner[0]}`
    m.reply('_Wird verarbeitet..._')
    
    let _participants = participants.map(user => user.id)
    
    let users = (await Promise.all(
        text.split(',')
            .map(v => v.replace(/[^0-9]/g, ''))
            .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
            .map(async v => [
                v,
                await conn.onWhatsApp(v + '@s.whatsapp.net')
            ])
    )).filter(v => v[1][0]?.exists).map(v => v[0] + '@c.us')

    const response = await conn.query({
        tag: 'iq',
        attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: m.chat,
        },
        content: users.map(jid => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }]
        }))
    })

    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null)
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0)
    
    const add = getBinaryNodeChild(response, 'add')
    const participant = getBinaryNodeChildren(response, 'add')
    
    let anu = participant[0].content.filter(v => v)
    
    if (anu[0].attrs.error == 408) {
        conn.sendButton(m.chat, `Konnte @${anu[0].attrs.jid.split('@')[0]} nicht hinzufügen!\nAnscheinend hat @${anu[0].attrs.jid.split('@')[0]} diese Gruppe verlassen :'v`, wm, 'Link', usedPrefix + `Link`, m)
    }
    
    for (const user of participant[0].content.filter(Gegenstand => Gegenstand.attrs.error == 403)) {
        const jid = user.attrs.jid
        const content = getBinaryNodeChild(user, 'add_request')

        if (content && content.attrs) {
            const invite_code = content.attrs.code
            const invite_code_exp = content.attrs.expiration

            if (invite_code && invite_code_exp) {
                const txt = `Lade @${jid.split('@')[0]} mit einer Einladung ein...`
                await m.reply(txt, null, {
                    mentions: await conn.parseMention(txt)
                })

                await conn.sendGroupV4Invite(m.chat, jid, invite_code, invite_code_exp, await conn.getName(m.chat), 'Einladung, um meiner WhatsApp-Gruppe beizutreten', jpegThumbnail)
            } else {
                console.error('Invite code or expiration is missing for:', jid)
            }
        } else {
            console.error('No add_request content for:', jid)
        }
    }
}

handler.help = ['add', '+', 'hinzufügen'].map(v => v + ' @user')
handler.tags = ['group']
handler.command = /^(add|\+|hinzufügen|einladen)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true
handler.fail = null

module.exports = handler
