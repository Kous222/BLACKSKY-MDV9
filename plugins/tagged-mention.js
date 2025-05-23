let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Helper function to cleanup JID
    const cleanJid = (jid) => jid ? (jid.includes(':') ? jid.split(':')[0] + '@s.whatsapp.net' : jid) : null
    
    // Extract target from mention or quoted message
    let target = m.mentionedJid && m.mentionedJid[0] ? cleanJid(m.mentionedJid[0]) : (m.quoted ? cleanJid(m.quoted.sender) : null)
    
    if (target) {
        // Extract target number properly
        const targetNum = target.split('@')[0]
        
        // Create the tag with the format: @phonenumber
        const tag = '@' + targetNum
        
        // Send simple test message with the tag
        await conn.reply(m.chat, `Testing mention functionality: ${tag}`, m, {
            mentions: [target]
        })
        
        // Test different mention formats
        await conn.reply(m.chat, `Test 1: Hello ${tag}`, m, {
            mentions: [target]
        })
        
        setTimeout(async () => {
            await conn.reply(m.chat, `Test 2: ${m.name} greets @${target.split('@')[0]}`, m, {
                mentions: [target]
            })
        }, 1000)
        
        setTimeout(async () => {
            // Try using WhatsApp's native mention
            const mentionedJid = [target]
            await conn.sendMessage(m.chat, { 
                text: `Test 3: Native mention to @${target.split('@')[0]}`,
                mentions: mentionedJid
            }, { quoted: m })
        }, 2000)
    } else {
        m.reply('Please mention a user or reply to their message')
    }
}

handler.help = ['tag']
handler.tags = ['tools']
handler.command = /^(tag|tagtest|testtag)$/i

module.exports = handler