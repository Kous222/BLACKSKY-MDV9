const os = require('os')

// Use a global flag to ensure startup message is only sent once across the entire application
if (typeof global.startupMessageSent === 'undefined') {
    global.startupMessageSent = false
}

// Used to format uptime for the startup message
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    return `${days}d ${hours}h ${minutes}m ${secs}s`
}

// Define the sendStartupMessage function
async function sendStartupMessage(conn, forceMessage = false) {
    // Check if connection is ready
    if (!conn || !conn.user) {
        console.log('\x1b[33m%s\x1b[0m', '⚠️ Cannot send startup message: Bot connection not ready')
        return false
    }
    
    // Check if we've already sent the message (unless forced)
    if (global.startupMessageSent && !forceMessage) {
        console.log('\x1b[33m%s\x1b[0m', '⚠️ Startup message already sent, skipping...')
        return false
    }
    
    try {
        // Set the global flag to prevent duplicate messages
        if (!forceMessage) {
            global.startupMessageSent = true
        }
        
        // Bot's own JID
        const botNumber = conn.user.jid
        console.log('\x1b[36m%s\x1b[0m', `📱 Bot number: ${botNumber}`)
        
        // Current date and time
        const now = new Date().toLocaleString()
        
        // Get system information
        const systemInfo = {
            platform: os.type(),
            version: os.release(),
            arch: os.arch(),
            totalRAM: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            freeRAM: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
            uptime: formatUptime(os.uptime()),
            nodeVersion: process.version
        }
        
        // Format the startup message
        const startupMessage = `
┌─⊷ *BLACKSKY-MD STARTUP NOTIFICATION* ⊶
│
│ 🤖 *BLACKSKY-MD is now ONLINE!*
│ ⏰ ${now}
│
│ 💻 *System Information:*
│ • Platform: ${systemInfo.platform}
│ • OS Version: ${systemInfo.version}
│ • Architecture: ${systemInfo.arch}
│ • Node.js: ${systemInfo.nodeVersion}
│
│ 🖥️ *Resources:*
│ • Total RAM: ${systemInfo.totalRAM}
│ • Free RAM: ${systemInfo.freeRAM}
│ • System Uptime: ${systemInfo.uptime}
│
│ 📲 *Bot Number:* ${botNumber.split('@')[0]}
│
└───────────────────────
`.trim()
        
        // Send the message to the bot's own number with image
        console.log('\x1b[33m%s\x1b[0m', '🟡 Sending startup message to bot...')
        await conn.sendMessage(botNumber, { 
            image: { url: './src/BLACKSKY-MD.png' },
            caption: startupMessage
        })
        console.log('\x1b[32m%s\x1b[0m', '✅ Startup message sent successfully!')
        return true
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', `❌ Error sending startup message: ${err}`)
        return false
    }
}

// Register the connection event handler
if (conn && conn.ev) {
    try {
        // Add a direct listener for connection updates
        conn.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update
            
            if (connection === 'open') {
                console.log('\x1b[32m%s\x1b[0m', '✅ CONNECTED! Bot is now ONLINE. Will send startup message...')
                
                // Wait for user to be fully available
                setTimeout(async () => {
                    // Try to send startup message (respects the global flag)
                    await sendStartupMessage(conn)
                }, 5000)
            }
        })
        console.log('\x1b[33m%s\x1b[0m', '🟡 Registered connection.update event handler in _startup-message.js')
    } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', `❌ Failed to register connection event: ${err}`)
    }
}

// This plugin handles startup messaging
let handler = async (m, { conn }) => {
    // This part runs when a message is received
    return // We don't need to do anything for messages
}

// This runs before any command processing for every message
handler.before = async function (m, { conn }) {
    // Skip if we already sent the startup message
    if (global.startupMessageSent) return true
    
    // Check if connection is ready
    if (!conn || !conn.user) {
        console.log('\x1b[33m%s\x1b[0m', '⚠️ Cannot send startup message: Bot connection not ready')
        return true
    }
    
    try {
        console.log('\x1b[33m%s\x1b[0m', '🟡 Connection detected - preparing to send startup message')
        
        // Use the global function to send the startup message (handles setting the flag internally)
        setTimeout(async () => {
            await sendStartupMessage(conn)
        }, 5000) // Wait 5 seconds to ensure connection is stable
    } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', `❌ Error in startup sequence: ${e}`)
    }
    
    return true // Continue processing
}

// Handle connection update events
handler.ev = async function (update) {
    const { connection, lastDisconnect } = update
    
    if (connection === 'open') {
        console.log('\x1b[32m%s\x1b[0m', '✅ CONNECTED! Bot is now online and ready.')
        
        // Wait for user to be fully available
        setTimeout(async () => {
            // Try to send startup message (respects the global flag)
            if (this.conn && this.conn.user) {
                await sendStartupMessage(this.conn)
            }
        }, 5000)
    }
}

module.exports = handler