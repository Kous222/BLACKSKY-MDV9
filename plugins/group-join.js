
let handler = async (m, { conn, args, text, usedPrefix, command, isOwner, isAdmin }) => {
    // For WhatsApp group invite links
    if (args[0]?.startsWith('https://chat.whatsapp.com/')) {
        let [_, code] = args[0].match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i) || []
        if (!code) return m.reply('Ungültiger Link')
        
        try {
            let res = await conn.groupAcceptInvite(code)
            m.reply('✅ Bot ist der Gruppe erfolgreich beigetreten!')
            
            // Send welcome message after joining
            await conn.sendMessage(res, {
                text: '❤️ HALLO ICH BIN BLACKSKY-MD BOT DER OWNER HAT MICH GESCHICKT ❤️',
                contextInfo: {
                    externalAdReply: {
                        title: 'BLACKSKY-MD BOT',
                        body: 'Your Personal WhatsApp Assistant',
                        thumbnailUrl: 'https://raw.githubusercontent.com/username/BLACKSKY-MD/main/src/BLACKSKY-MD.png',
                        sourceUrl: 'https://api.betabotz.eu.org',
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            })
        } catch (e) {
            m.reply('❌ Fehler beim Beitreten der Gruppe. Möglicherweise ist der Link ungültig oder abgelaufen.')
            console.log('Error in join handler:', e)
        }
        return
    }

    // For managing join requests
    let groupId;
    let [subCommand, targetGroup, options] = args;

    if (m.isGroup) {
        if (!isAdmin && !isOwner) return m.reply('Du musst Admin sein, um diesen Befehl in Gruppen zu verwenden!');
        groupId = m.chat;
        [subCommand, options] = args;
    } else {
        if (!targetGroup) return m.reply(`Bitte gib die Gruppen-ID an.\n\nBeispiel: ${usedPrefix + command} list 1234567890@g.us`);
        groupId = targetGroup.endsWith('@g.us') ? targetGroup : targetGroup + '@g.us';
    }

    try {
        const joinRequestList = await conn.groupRequestParticipantsList(groupId);
        
        const formatDate = (timestamp) => {
            return new Intl.DateTimeFormat('de-DE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date(timestamp * 1000));
        };

        switch (subCommand?.toLowerCase()) {
            case "list":
                if (!joinRequestList.length) return m.reply('Keine ausstehenden Beitrittsanfragen.');
                
                const formattedList = joinRequestList.map((request, i) => 
                    `*${i + 1}.* @${request.jid.split('@')[0]}\n` +
                    `• Anfrage-Zeit: ${formatDate(request.request_time)}\n`
                ).join('\n');
                
                return conn.reply(m.chat, `*Ausstehende Beitrittsanfragen:*\n\n${formattedList}`, m, {
                    mentions: joinRequestList.map(r => r.jid)
                });

            case "approve":
            case "reject": {
                if (!options) return m.reply(`Bitte gib die Nummer der Anfrage oder 'all' an.`);
                
                let processed = [];
                if (options === 'all') {
                    for (let request of joinRequestList) {
                        await conn.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);
                        processed.push(request.jid);
                    }
                } else {
                    const index = parseInt(options) - 1;
                    if (isNaN(index) || index < 0 || index >= joinRequestList.length) {
                        return m.reply('Ungültige Anfrage-Nummer!');
                    }
                    await conn.groupRequestParticipantsUpdate(groupId, [joinRequestList[index].jid], subCommand);
                    processed.push(joinRequestList[index].jid);
                }

                const action = subCommand === 'approve' ? 'genehmigt' : 'abgelehnt';
                return conn.reply(m.chat, `Beitrittsanfrage${processed.length > 1 ? 'n' : ''} ${action} für:\n${processed.map(jid => `@${jid.split('@')[0]}`).join('\n')}`, m, {
                    mentions: processed
                });
            }

            default:
                return m.reply(`
*Gruppen-Beitrittsanfragen verwalten*

Verfügbare Befehle:
${usedPrefix + command} list - Zeigt ausstehende Beitrittsanfragen
${usedPrefix + command} approve <nummer|all> - Genehmigt Beitrittsanfragen
${usedPrefix + command} reject <nummer|all> - Lehnt Beitrittsanfragen ab
${usedPrefix + command} <whatsapp-group-link> - Bot tritt der Gruppe bei

Beispiel:
${usedPrefix + command} approve 1 - Genehmigt erste Anfrage
${usedPrefix + command} reject all - Lehnt alle Anfragen ab
`.trim());
        }
    } catch (error) {
        console.error('Fehler beim Verarbeiten der Beitrittsanfrage:', error);
        return m.reply('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
    }
};

handler.help = ['join <whatsapp group link>'];
handler.tags = ['group'];
handler.command = /^(join|beitritt)$/i;

module.exports = handler;
