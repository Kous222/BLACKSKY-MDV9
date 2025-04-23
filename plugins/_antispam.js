exports.before = async function (m, { isAdmin, isOwner, args, command }) {
    let user = db.data.users[m.sender];
    let chat = db.data.chats[m.chat];

    // If the chat has disabled spam detection or if the user is an admin/owner, skip processing.
    if (!chat.spamEnabled || isAdmin || isOwner) {
        return; 
    }

    // If it's a broadcast message or sent by the bot itself, and the message is empty or group isn't banned, skip.
    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chat.isBanned) return;

    // If the message doesn't start with a command, skip it.
    if (!m.text.startsWith('.') && !m.text.startsWith('#') && !m.text.startsWith('!') && !m.text.startsWith('/') && !m.text.startsWith('\\')) return;

    var jetzt = new Date() * 1;

    // Reset ban if time has passed
    if (user.banned && jetzt >= user.lastBanned) {
        user.banned = false;
    }
    
    // If the user is banned, stop the process
    if (user.banned) return;

    // Initialize spam tracking
    this.spam = this.spam || {};

    // Handle spam detection
    if (m.sender in this.spam) {
        this.spam[m.sender].count++;
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam >= 4) {
            if (this.spam[m.sender].count >= 2) {
                user.banned = true;
                m.reply('🚫 Achtung! SPAM ERKANNT! 🚫\n\nWarte 5 Sekunden, bevor du wieder schreiben kannst! ⏳');

                var Sekunden = 10000 * 1;
                user.lastBanned = jetzt + Sekunden;
            }

            this.spam[m.sender].count = 0;
            this.spam[m.sender].lastspam = m.messageTimestamp.toNumber();
        }
    } else {
        this.spam[m.sender] = {
            jid: m.sender,
            count: 0,
            lastspam: 0
        };
    }

    // Handle admin command to enable/disable spam detection
    if (command === 'spam' && isAdmin) {
        if (!args[0] || (args[0] !== 'enable' && args[0] !== 'disable')) {
            return m.reply('❗ Benutze entweder `enable` oder `disable` um Spam-Erkennung zu aktivieren/deaktivieren.');
        }

        // Enable or disable spam detection based on the argument
        chat.spamEnabled = args[0] === 'enable';

        // Save updated chat settings
        db.data.chats[m.chat] = chat;
        m.reply(`✅ Spam-Erkennung wurde ${args[0] === 'enable' ? 'aktiviert' : 'deaktiviert'}!`);
    }
};
