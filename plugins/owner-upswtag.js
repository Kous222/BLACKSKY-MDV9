const baileys = require("@adiwajshing/baileys");

let handler = async (m, { conn, args }) => {
    async function fetchParticipants(...jids) {
        let results = [];
        for (const jid of jids) {
            let { participants } = await conn.groupMetadata(jid);
            participants = participants.map(({ id }) => id);
            results = results.concat(participants);
        }
        return results;
    }

    async function mentionStatus(jids, content) {
        const msg = await baileys.generateWAMessage(baileys.STORIES_JID, content, {
            hochladen: conn.waUploadToServer
        });

        let statusJidList = [];
        for (const _jid of jids) {
            if (_jid.endsWith("@g.us")) {
                for (const jid of await fetchParticipants(_jid)) {
                    statusJidList.push(jid);
                }
            } else {
                statusJidList.push(_jid);
            }
        }
        statusJidList = [...new Set(statusJidList)];

        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id,
            statusJidList,
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: jids.map((jid) => ({
                                tag: "to",
                                attrs: { jid },
                                content: undefined
                            }))
                        }
                    ]
                }
            ]
        });

        for (const jid of jids) {
            let type = jid.endsWith("@g.us") ? "groupStatusMentionMessage" : "statusMentionMessage";
            await conn.relayMessage(jid, {
                [type]: {
                    message: {
                        protocolMessage: {
                            key: msg.key,
                            type: 25
                        }
                    }
                }
            }, {
                additionalNodes: [
                    {
                        tag: "meta",
                        attrs: { is_status_mention: "true" },
                        content: undefined
                    }
                ]
            });
        }

        return msg;
    }

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    let content = {};

    if (mime) {
        let medien = await q.herunterladen();

        if (/image/.test(mime)) {
            content.image = medien;
        } else if (/Video/.test(mime)) {
            content.Video = medien;
        } else if (/Audio/.test(mime)) {
            content.Audio = medien;
        } else {
            return m.reply("Jenis file nicht didukung!");
        }

        if (q.text) content.caption = q.text;
    } else if (args[0]) {
        let url = args[0];
        let type = args[1] || 'text';

        if (type === 'image') {
            content.image = { url };
        } else if (type === 'Video') {
            content.Video = { url };
        } else if (type === 'Audio') {
            content.Audio = { url };
        } else {
            content.text = args.slice(1).join(" ") || url;
        }
    } else {
        return m.reply("Reply medien oder eingeben url mit format:\n.Status <url> <image/Video/Audio/text>");
    }

    mentionStatus([m.chat], content).catch(console.error);
};

handler.command = ['upswtag'];
handler.tags = ['tools'];
handler.help = ['upswtag'];
handler.group = true 
handler.owner = true

module.exports = handler;
