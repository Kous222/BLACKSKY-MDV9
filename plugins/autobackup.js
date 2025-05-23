const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');


const sendDatabaseToGroup = async (conn, groupJid) => {
    try {
        const filePath = path.resolve('./database.json'); 
        if (!fs.existsSync(filePath)) {
            console.error('File database.json nicht gefunden!');
            return;
        }

        const fileBuffer = fs.readFileSync(filePath); 
        await conn.sendMessage(
            groupJid,
            {
                document: fileBuffer,
                mimetype: 'application/json',
                fileName: 'database.json',
            }
        );
        console.log(`Database erfolgreich disenden zu Gruppe: ${groupJid}`);
    } catch (err) {
        console.error('Error wenn senden file database:', err);
    }
};
const scheduleSendDatabase = (conn, groupJid) => {
    schedule.scheduleJob('00 22 * * *', async () => {   
        // 00 22 * * * artinya backup jeder jam 22:00
        // 00 -> menit 22 -> jam
        console.log('Mestarten pengiriman database auf jam 22:00...');
        try {
            await sendDatabaseToGroup(conn, groupJid); 
        } catch (err) {
            console.error('Ein Error ist aufgetreten wenn senden:', err);
        }
    });
};

const groupJid = '120363216901617825@g.us'; //in ändern mit Jid grub du! in kann von (=> m)

if (global.conn) {
    scheduleSendDatabase(global.conn, groupJid);
} else {
    console.error('Koneksi zu Gruppe noch nicht gibt!');
}

module.exports = {};