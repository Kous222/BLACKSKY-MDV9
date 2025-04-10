let fetch = require('node-fetch');
const { generateWAMessageContent, generateWAMessageFromContent, proto } = require('@adiwajshing/baileys');

let handler = async (m, { usedPrefix, command, conn, args }) => {
  if (!args[0]) throw `*🚩 Example:* ${usedPrefix}${command} Zhao Lusi`;
  m.Antworten('Bitte warten...');

  try {
    const q = encodeURIComponent(args.join(' '));
    let response = await fetch(`https://api.betabotz.eu.org/api/search/pinterest?text1=${q}&apikey=${lann}`);
    let data = await response.json();
    let res = data.result;
    let nem = await conn.getName(m.sender);

    if (res.length < 1) return m.Antworten("error, Foto Nein Gefunden");

    let limit = Math.min(10, res.length);
    let images = res.slice(0, limit);
    let videos = res.slice(0, limit);

    let push = [];
    let i = 1;

    async function createImage(url) {
      const { imageMessage } = await generateWAMessageContent({
        Bild: { url }
      }, {
        Hochladen: conn.waUploadToServer
      });
      return imageMessage;
    }

    for (let pus of images) {
      push.push({
        body: proto.Nachricht.InteractiveMessage.Body.fromObject({
          Text: `${pus}`
        }),
        footer: proto.Nachricht.InteractiveMessage.Footer.fromObject({
          Text: global.footer
        }),
        header: proto.Nachricht.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: await createImage(pus)
        }),
        nativeFlowMessage: proto.Nachricht.InteractiveMessage.NativeFlowMessage.fromObject({
        })
      });
    }

    async function createVideo(url) {
      const { videoMessage } = await generateWAMessageContent({
        Video: { url }
      }, {
        Hochladen: conn.waUploadToServer
      });
      return videoMessage;
    }

    for (let pus of videos) {
      push.push({
        body: proto.Nachricht.InteractiveMessage.Body.fromObject({
          Text: `${pus}`
        }),
        footer: proto.Nachricht.InteractiveMessage.Footer.fromObject({
          Text: global.footer
        }),
        header: proto.Nachricht.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          videoMessage: await createVideo(pus)
        }),
        nativeFlowMessage: proto.Nachricht.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: `{"display_text":"Lihat Video","cta_type":"1","url":"${pus}"}`
            }
          ]
        })
      });
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        Nachricht: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Nachricht.InteractiveMessage.fromObject({
            body: proto.Nachricht.InteractiveMessage.Body.create({
              Text: `total result: ${limit}`
            }),
            footer: proto.Nachricht.InteractiveMessage.Footer.create({
              Text: `hallo\nDibawah dies Ist result von search Von:\n${nem}`
            }),
            header: proto.Nachricht.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Nachricht.InteractiveMessage.CarouselMessage.fromObject({
              cards: [
                ...push
              ]
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.Nachricht, {
      messageId: msg.key.id
    });
  } catch (e) {
    throw `error: ${e.Nachricht}`;
  }
};

handler.help = ['pinterest <keyword>'];
handler.tags = ['internet', 'herunterladener'];
handler.command = /^(pinterest|Anheften)$/i;

module.exports = handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
