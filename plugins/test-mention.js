let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Helper function to cleanup JID
    const cleanJid = (jid) => jid ? (jid.includes(':') ? jid.split(':')[0] + '@s.whatsapp.net' : jid) : null
    
    // Extract target from mention or quoted message
    let target = m.mentionedJid && m.mentionedJid[0] ? cleanJid(m.mentionedJid[0]) : (m.quoted ? cleanJid(m.quoted.sender) : null)
    
    // Get full message data for debugging
    console.log('Full message structure:', JSON.stringify(m, null, 2))
    
    // Create debug text
    let debugText = `*Mention System Debug:*\n`
    debugText += `- Your JID: ${cleanJid(m.sender)}\n`
    debugText += `- Your name: ${m.name || 'Unknown'}\n`
    debugText += `- Connected as: ${conn.user?.name || 'Unknown'}\n`
    debugText += `- In chat: ${m.chat}\n`
    
    // Add target info if available
    if (target) {
        const targetName = '@' + target.split('@')[0]
        debugText += `\n*Target found:*\n`
        debugText += `- Target JID: ${target}\n`
        debugText += `- Target mention: ${targetName}\n`
        debugText += `- Found via: ${m.mentionedJid ? 'mention' : 'reply'}\n`
        
        // Send the debug info with proper mention
        await conn.reply(m.chat, debugText, m, {
            mentions: [target]
        })
        
        // Send a test mention
        setTimeout(async () => {
            await conn.reply(m.chat, `${m.name} ist testing mentions with ${targetName}`, m, {
                mentions: [target]
            })
        }, 1000)
    } else {
        debugText += `\n*No target found*\n`
        debugText += `- Please @mention someone or reply to their message`
        await m.reply(debugText)
    }
}

handler.help = ['testmention']
handler.tags = ['tools']
handler.command = /^(testmention|testmention|tm)$/i

module.exports = handler