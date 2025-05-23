const axios = require('axios');
let search = require("yt-search");

let handler = async (m, { conn, text, command }) => {
// kosong
};

handler.before = async (m, { conn }) => {
    try {
        if (!m.isGroup) return;
        conn.selfai = conn.selfai || {};
        if (m.isBaileys && m.fromMe) return;
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            const botNumber = conn.user.jid.split('@')[0];
            
            const isMention = m.mentionedJid.some(mentioned => 
                mentioned.includes(botNumber)
            );
            
            if (isMention) {
                const filter = m.text.replace(/@\d+/g, '').trim();
                
                if (filter.toLowerCase() === '/reset') {
                    delete conn.selfai[m.sender];
                    await m.reply('Session chat erfolgreich direset.');
                    return true;
                }
                
                // Wenn will gibt Funktion reset global sessions AI
                /**if (filter.toLowerCase() === '/resetall') {
                    conn.selfai = {};
                    await m.reply('Alle session chat erfolgreich direset.');
                    return true;
                }
                **/
                
                if (filter.toLowerCase().startsWith('/imagine')) {
                    const imagePrompt = filter.replace('/imagine', '').trim();
                    if (!imagePrompt) {
                        await m.reply('Bitte geben Sie eine Beschreibung des Bildes ein, das Sie erstellen möchten.');
                        return true;
                    }

                    try {
                        await conn.sendPresenceUpdate('composing', m.chat);
                        const response = await axios.get(`https://api.betabotz.eu.org/api/search/openai-image?apikey=${global.lann}&text=${encodeURIComponent(imagePrompt)}`, {
                            responseType: 'arraybuffer'
                        });
                        
                        const image = response.data;
                        await conn.sendFile(m.chat, image, 'aiimg.jpg', null, m);
                    } catch (error) {
                        console.error(error)
                        await m.reply('Ein Error ist aufgetreten wenn memerstellen Bild. Bitte versuche es erneut.');
                    }
                    return true;
                }

                if (filter.toLowerCase().startsWith('/lagu')) {
                    const songprompt = filter.replace('/lagu', '').trim();
                    if (!songprompt) {
                        await m.reply('Bitte geben Sie den Titel des Liedes ein, nach dem Sie suchen möchten.');
                        return true;
                    }
                        await conn.sendPresenceUpdate('composing', m.chat);
                    
                                const look = await search(songprompt);
                                const convert = look.videos[0];
                                if (!convert) throw 'Video/Audio nicht gefunden';
                                if (convert.seconds >= 3600) {
                                    return conn.reply(m.chat, 'Das Video ist länger als 1 Stunde!', m);
                                } else {
                                    let audioUrl;
                                    try {
                                        audioUrl = await youtube(convert.url);
                                    } catch (e) {
                                        conn.reply(m.chat, 'Please wait...', m);
                                        audioUrl = await youtube(convert.url);
                                    }
                        
                                    let caption = '';
                                    caption += `∘ Title : ${convert.title}\n`;
                                    caption += `∘ Ext : Search\n`;
                                    caption += `∘ id : ${convert.videoId}\n`;
                                    caption += `∘ Duration : ${convert.timestamp}\n`;
                                    caption += `∘ Viewers : ${convert.views}\n`;
                                    caption += `∘ Upload At : ${convert.ago}\n`;
                                    caption += `∘ Author : ${convert.author.name}\n`;
                                    caption += `∘ Channel : ${convert.author.url}\n`;
                                    caption += `∘ Url : ${convert.url}\n`;
                                    caption += `∘ Description : ${convert.description}\n`;
                                    caption += `∘ Thumbnail : ${convert.image}`;
                        
                                    await conn.sendMessage(m.chat, {
                                        Audio: {
                                            url: audioUrl.result.mp3
                                        },
                                        mimetype: 'Audio/mpeg',
                                        contextInfo: {
                                            externalAdReply: {
                                                title: convert.title,
                                                body: "",
                                                thumbnailUrl: convert.image,
                                                sourceUrl: audioUrl.mp3,
                                                mediaType: 1,
                                                showAdAttribution: true,
                                                renderLargerThumbnail: true
                                            }
                                        }
                                    }, {
                                        quoted: m
                                    });
                                }
                            
                    return true;
                }
                async function youtube(url) {
                    try {
                    const { data } = await axios.get("https://api.betabotz.eu.org/api/herunterladen/yt?url="+url+"&apikey="+lann)
                    return data;
                    } catch (e) {
                    return e;
                    }
                 }

                await conn.sendPresenceUpdate('composing', m.chat);

                if (filter.toLowerCase().startsWith('/Video')) {
                    const searchvideo = filter.replace('/Video', '').trim();
                    if (!searchvideo) {
                        await m.reply('Bitte geben Sie den Titel des Videos ein, nach dem Sie suchen möchten.');
                        return true;
                    }

                    try {
                        await conn.sendPresenceUpdate('composing', m.chat);
                         try {
                                const look = await search(searchvideo);
                                const convert = look.videos[0];
                                if (!convert) throw 'Video/Audio nicht gefunden';
                                if (convert.seconds >= 3600) {
                                    return conn.reply(m.chat, 'Das Video ist länger als 1 Stunde!', m);
                                } else {
                                    let videoUrl;
                                    try {
                                        videoUrl = await yts(convert.url);
                                    } catch (e) {
                                        conn.reply(m.chat, 'Please wait...', m);
                                        videoUrl = await yts(convert.url);
                                    }
                        
                                    let caption = '';
                                    caption += `∘ Title : ${convert.title}\n`;
                                    caption += `∘ Ext : Search\n`;
                                    caption += `∘ id : ${convert.videoId}\n`;
                                    caption += `∘ Duration : ${convert.timestamp}\n`;
                                    caption += `∘ Viewers : ${convert.views}\n`;
                                    caption += `∘ Upload At : ${convert.ago}\n`;
                                    caption += `∘ Author : ${convert.author.name}\n`;
                                    caption += `∘ Channel : ${convert.author.url}\n`;
                                    caption += `∘ Url : ${convert.url}\n`;
                                    caption += `∘ Description : ${convert.description}\n`;
                                    caption += `∘ Thumbnail : ${convert.image}`;
                    
                        
                                    await conn.sendMessage(m.chat, {
                                        Video: {
                                            url: videoUrl.result.mp4
                                        },
                                        mimetype: 'Video/mp4',
                                        contextInfo: {
                                            externalAdReply: {
                                                title: convert.title,
                                                body: "",
                                                thumbnailUrl: convert.image,
                                                sourceUrl: videoUrl.mp4,
                                                mediaType: 1,
                                                showAdAttribution: true,
                                                renderLargerThumbnail: true
                                            }
                                        }
                                    }, {
                                        quoted: m
                                    });
                                }
                            } catch (e) {
                                conn.reply(m.chat, `*Error:* ` + e, m);
                            }


                    } catch (error) {
                        console.error(error)
                        await m.reply('Ein Error ist aufgetreten wenn mensuchen Video. Bitte versuche es erneut.');
                    }
                    return true;
                }
                async function yts(url) {
                   try {
                   const { data } = await axios.get("https://api.betabotz.eu.org/api/herunterladen/ytmp4?url="+url+"&apikey="+lann)
                   return data;
                   } catch (e) {
                   return e;
                   }
                }

                await conn.sendPresenceUpdate('composing', m.chat);
    
                if (!filter) {
                    const empty_response = [
                        `Hallo ${m.name}, wie kann ich Ihnen heute helfen?`,
                        `Gibt es etwas, womit ich Ihnen helfen kann, ${m.name}?`,
                        `Hallo ${m.name}, bitte teilen Sie mir mit, was Sie brauchen.`,
                        `${m.name}, ich bin bereit zu helfen. Haben Sie eine Frage?`,
                        `Worüber möchten Sie sprechen, ${m.name}?`
                    ];
                    
                    const _response_pattern = empty_response[Math.floor(Math.random() * empty_response.length)];
                    
                    await m.reply(_response_pattern);
                    return true;
                }

                if (!conn.selfai[m.sender]) {
                    conn.selfai[m.sender] = { sessionChat: [] };
                }
                
                if ([".", "#", "!", "/", "\\"].some(prefix => filter.startsWith(prefix))) return;
                
                const previousMessages = conn.selfai[m.sender].sessionChat || [];
                const messages = [
                    { role: "system", content: "Du bist BTZ, ein persönlicher Assistent, der von Betabotz erstellt wurde und jederzeit bereit ist zu helfen. Beantworte jede Frage mit Emoticons und sei so freundlich wie möglich zum Benutzer. Vergiss nicht, in deinen Antworten auch Humor einzubauen, um den Benutzer bei Laune zu halten! :)" },
                    { role: "assistant", content: `Ich bin BTZ, dein persönlicher Assistent, der dir jederzeit helfen kann! Wie kann ich dir heute helfen?` },
                    ...previousMessages.map((msg, i) => ({ role: i % 2 === 0 ? 'user' : 'assistant', content: msg })),
                    { role: "user", content: filter }
                ];
                
                try {
                    const chat = async function(message) {
                        return new Promise(async (resolve, reject) => {
                            try {
                                const params = {
                                    message: message,
                                    apikey: global.lann
                                };
                                const { data } = await axios.post('https://api.betabotz.eu.org/api/search/openai-custom', params);
                                resolve(data);
                            } catch (error) {
                                reject(error);
                            }
                        });
                    };
                    
                    let res = await chat(messages);
                    if (res && res.result) {
                        await m.reply(res.result);
                        conn.selfai[m.sender].sessionChat = [
                            ...conn.selfai[m.sender].sessionChat,
                            filter,
                            res.result
                        ];
                    } else {
                        m.reply("Fehler beim Abrufen der Daten. Bitte @mention /reset, um die Konversation neu zu starten.");
                    }
                } catch (e) {
                    console.error(e);
                    m.reply("Ein Fehler ist bei der Verarbeitung der Anfrage aufgetreten.");
                }
                return true;
            }
        }
        return true;
    } catch (error) {
        console.error(error);
        return true;
    }
};

module.exports = handler;