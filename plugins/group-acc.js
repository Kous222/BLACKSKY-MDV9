// Danke an Kasanlet
let handler = async (m, { conn, args }) => {  
    const groupId = m.chat;  
    const [subCommand, options] = args;  
    const joinRequestList = await conn.groupRequestParticipantsList(groupId);  
    const formatDate = (timestamp) => new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(timestamp * 1000));  
    const reply = (text) => conn.reply(m.chat, text, m);  

    switch (subCommand) {  
        case "list":  
            const formattedList = joinRequestList.length > 0  
                ? joinRequestList.map((request, i) => `*${i + 1}.*\n• Number: ${request.jid.split('@')[0]}\n• Anfrage-method: ${request.request_method}\n• Anfragezeit: ${formatDate(request.request_time)}\n\n`).join('')  
                : "Keine ausstehenden Beitrittsanfragen.";  
            reply(`*Liste der Beitrittsanfragen:*\n\n${formattedList}`);  
            break;  
        case "reject":  
        case "approve":  
            if (options === "all") {  
                for (const request of joinRequestList) {  
                    await conn.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);  
                    console.log(`Verarbeite ${subCommand}-Anfrage für Teilnehmer mit JID: ${request.jid}`);  
                }  
                reply(`*${subCommand === 'approve' ? 'Genehmige' : 'Lehne ab'} alle Beitrittsanfragen.*`);  
            } else {  
                const actions = options.split('|').map(action => action.trim());  
                const participants = actions.map(action => joinRequestList[parseInt(action) - 1]).filter(request => request);  
                if (participants.length > 0) {  
                    let formattedResponse = '';  
                    for (const request of participants) {  
                        const response = await conn.groupRequestParticipantsUpdate(groupId, [request.jid], subCommand);  
                        const Status = response[0].Status === 'success' ? 'erfolgreich' : 'fehlgeschlagen';  
                        formattedResponse += `*${participants.indexOf(request) + 1}.*\n• Status: ${Status}\n• Number: ${request.jid.split('@')[0]}\n\n`;  
                        console.log(`Verarbeite ${subCommand}-Anfrage für Teilnehmer mit JID: ${request.jid}`);  
                    }  
                    reply(`*${subCommand === 'approve' ? 'Genehmige' : 'Lehne ab'} Beitrittsanfragen:*\n\n${formattedResponse}`);  
                } else {  
                    reply("Keine passenden Mitglieder für Ablehnung/Genehmigung gefunden.");  
                }  
            }  
            break;  
        default:  
            reply("Ungültiger Befehl. Verwende *acc list* oder *akzeptieren list*, *acc approve [Number]*, *acc reject [Number]*, *acc reject [JID]*, *acc reject/approve all* um alle Beitrittsanfragen abzulehnen/zu genehmigen.");  
    }
}

handler.help = ['acc *option*', 'akzeptieren *option*'];  
handler.tags = ['gruppe'];  
handler.command = /^(acc|akzeptieren)$/i;  
handler.group = true;  
handler.admin = true;  
handler.botAdmin = true;  
handler.fail = null;  

module.exports = handler;
