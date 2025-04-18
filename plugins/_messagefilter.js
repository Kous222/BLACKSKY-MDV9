/**
 * Message Filter Plugin
 * Prevents the bot from responding to regular messages
 * Makes sure the bot only responds to commands (messages with prefixes) or specific triggers
 */

let handler = async (m, { conn }) => {
    // This function is required for the handler to work but we don't need to do anything here
    // The actual filtering happens in the before function
}

// This runs before the message is processed by other plugins
handler.before = async (m, { conn }) => {
    // Skip processing if message is from the bot itself
    if (m.fromMe) return

    // Skip processing if message is from Baileys (system message)
    if (m.isBaileys) return
    
    // Skip processing if there's no text
    if (!m.text) return
    
    // Check for special message types that should be processed regardless of prefix
    // Process button responses
    if (m.mtype === "interactiveResponseMessage" || 
        m.message?.nativeFlowResponseMessage || 
        m.message?.buttonsResponseMessage || 
        m.message?.templateButtonReplyMessage || 
        m.message?.listResponseMessage) {
        return false // Allow processing for button responses
    }
    
    // Check if the message has a mention of the bot (for AI responses)
    const hasBotMention = m.mentionedJid && m.mentionedJid.length > 0 && 
        m.mentionedJid.some(mentioned => {
            const botNumber = conn.user?.jid?.split('@')[0];
            return botNumber && mentioned.includes(botNumber);
        });
    
    if (hasBotMention) {
        return false; // Allow processing for messages that mention the bot
    }
    
    // Check if the message starts with a command prefix
    // Only allow messages that start with these prefixes to be processed
    const prefixes = [".", "/", "!", "#", "$", "?"]
    
    // If message doesn't start with a prefix, block it from being processed
    if (!prefixes.some(prefix => m.text.startsWith(prefix))) {
        // Returning true means we're handling this message and no other plugins should process it
        // This effectively blocks all normal messages from triggering commands
        return true
    }
    
    // Let the message continue to be processed if it has a command prefix
    return false
}

// Set to highest priority to ensure it runs before all other plugins
handler.priority = 1000

module.exports = handler