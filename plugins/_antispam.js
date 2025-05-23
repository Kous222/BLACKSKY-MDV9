exports.before = async function (m, { isAdmin, isOwner, args, command }) {
    let user = db.data.users[m.sender];
    let chat = db.data.chats[m.chat];

    // Admin/Owner command to enable/disable spam detection (must run always)
    if (command === 'spam' && (isAdmin || isOwner)) {
        if (!args[0] || (args[0] !== 'enable' && args[0] !== 'disable')) {
            return m.reply('❗ Benutze entweder `enable` oder `disable`, um die Spam-Erkennung zu steuern.');
        }

        chat.spamEnabled = args[0] === 'enable';
        db.data.chats[m.chat] = chat;
        return m.reply(`✅ Spam-Erkennung wurde ${args[0] === 'enable' ? 'aktiviert' : 'deaktiviert'}!`);
    }

    // Skip rest if spam detection is disabled or user is admin/owner
    if (!chat.spamEnabled || isAdmin || isOwner) return;

    // Ignore broadcast or bot messages
    if ((m.chat.endsWith('broadcast') || m.fromMe) && !m.message && !chat.isBanned) return;

    // Only process commands
    if (!m.text.startsWith('.') && !m.text.startsWith('#') && !m.text.startsWith('!') && !m.text.startsWith('/') && !m.text.startsWith('\\')) return;

    var jetzt = Date.now();

    // Reset ban if time has passed
    if (user.banned && jetzt >= user.lastBanned) {
        user.banned = false;
    }

    // Block if banned
    if (user.banned) return;

    // Spam detection memory
    this.spam = this.spam || {};

    // Spam logic
    if (m.sender in this.spam) {
        this.spam[m.sender].count++;
        if (m.messageTimestamp.toNumber() - this.spam[m.sender].lastspam >= 4) {
            if (this.spam[m.sender].count >= 2) {
                user.banned = true;
                m.reply('🚫 Achtung! SPAM ERKANNT! 🚫\n\nWarte 5 Sekunden, bevor du wieder schreiben kannst! ⏳');

                var Sekunden = 5000;
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
};
