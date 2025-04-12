const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, participants }) => {
    let now = new Date() * 1;
    let groups = [];

    try {
        // Fetch all groups the bot is participating in
        const allGroups = await conn.groupFetchAllParticipating();
        groups = Object.keys(allGroups); // Get the group IDs from the response
    } catch (e) {
        console.error('Error fetching groups:', e);
        m.reply('Es gab ein Problem beim Abrufen der Gruppen!');
        return;
    }

    // Debugging: Log all groups fetched
    console.log('All Groups the Bot is in:', groups);

    let txt = '';

    let groupDataFile = path.join(__dirname, 'info-listgroup.json');
    let groupData;

    if (fs.existsSync(groupDataFile)) {
        groupData = JSON.parse(fs.readFileSync(groupDataFile, 'utf-8'));
    } else {
        groupData = {};
    }

    // Check if group data has been added for each group
    for (let jid in groupData) {
        if (!groups.includes(jid)) {
            groups.push(jid); // Ensure groups from the data file are added to the list
        }
    }

    // Fetch group info for each group the bot is part of
    for (let jid of groups) {
        let chat = conn.chats[jid] || {};
        let groupInfo = groupData[jid] || {
            isBanned: false,
            welcome: false,
            antiLink: false,
            delete: true,
        };
        groupData[jid] = groupInfo;

        // Build the output string
        txt += `${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'Verlassen' : 'Beigetreten'}]\n${groupInfo.expired ? msToDate(groupInfo.expired - now) : '*Keine abgelaufene Gruppe festgelegt*'}
${groupInfo.isBanned ? '✅' : '❌'} _Gruppe gesperrt_
${groupInfo.welcome ? '✅' : '❌'} _Auto Willkommen_
${groupInfo.antiLink ? '✅' : '❌'} _Anti Link_\n\n`;
    }

    // Send the group list to the user
    m.reply(`Gruppenliste:
Gesamtanzahl Gruppen: ${groups.length}

${txt}

`.trim());

    // Update the group data file
    fs.writeFileSync(groupDataFile, JSON.stringify(groupData, null, 2));
}

handler.help = ['grouplist'];
handler.tags = ['group'];
handler.command = /^(group(s|list)|(s|list)group)$/i;

module.exports = handler;

// Convert milliseconds to date format (days, hours, minutes)
function msToDate(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return `${days} Tag ${hours} Stunde ${minutes} Minute`;
}
