let { performance } = require('perf_hooks');
let osu = require('node-os-utils');
let handler = async (m, { conn, command, usedPrefix, DevMode }) => {
    try {
        let NotDetect = 'Not Detect';
        let old = performance.now();
        let cpu = osu.cpu;
        let cpuCore = cpu.count();
        let drive = osu.drive;
        let mem = osu.mem;
        let netstat = osu.netstat;
        let OS = osu.os.platform();

        // Safe handling of CPU model
        let cpuModel = 'Unknown Model';
        try {
            cpuModel = await cpu.model(); // Get CPU model if available
        } catch (e) {
            cpuModel = NotDetect; // Default value if model() fails
        }

        let cpuPer;
        let p1 = cpu.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage;
        }).catch(() => {
            cpuPer = NotDetect;
        });

        let driveTotal, driveUsed, drivePer;
        let p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
            driveUsed = info.usedGb,
            drivePer = (info.usedPercentage + '%');
        }).catch(() => {
            driveTotal = NotDetect,
            driveUsed = NotDetect,
            drivePer = NotDetect;
        });

        let ramTotal, ramUsed;
        let p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
            ramUsed = info.usedMemMb;
        }).catch(() => {
            ramTotal = NotDetect,
            ramUsed = NotDetect;
        });

        let netsIn, netsOut;
        let p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
            netsOut = (info.total.outputMb + ' MB');
        }).catch(() => {
            netsIn = NotDetect,
            netsOut = NotDetect;
        });

        await Promise.all([p1, p2, p3, p4]);
        await conn.reply(m.chat, `_Teste ${command}..._`, m);

        let _ramTotal = (ramTotal + ' MB');
        let neww = performance.now();

        var txt = `
        *「 Status 」*
        Betriebssystem : *${OS}*
        CPU Modell : *${cpuModel}*
        CPU Kerne : *${cpuCore} Kern(e)*
        CPU Auslastung : *${cpuPer}%*
        Arbeitsspeicher : *${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})*
        Festplatte : *${driveUsed} / ${driveTotal} (${drivePer})*
        Ping : *${Math.round(neww - old)} ms*
        Internet Eingang : *${netsIn}*
        Internet Ausgang : *${netsOut}*
        `;

        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: txt, 
                contextInfo: {
                    externalAdReply: {
                        title: "",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/ec8cf04e3a2890d3dce9c.jpg',
                        sourceUrl: ''
                    }
                },
                mentions: [m.sender]
            }
        }, {});
        console.log(OS);
    } catch (e) {
        console.log(e);
        await conn.reply(m.chat, "Ein Fehler ist aufgetreten", m);
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'Status.js error\nNr: *' + m.sender.split `@` [0] + '*\nBefehl: *' + m.text + '*\n\n*' + e + '*', m);
            }
        }
    }
};
handler.help = ['Status', 'statusBot', 'zustand', 'zustandBot'];
handler.tags = ['info'];
handler.command = /^(Bot)?(stat(us)?|zustand)(Bot)?$/i;

module.exports = handler;
