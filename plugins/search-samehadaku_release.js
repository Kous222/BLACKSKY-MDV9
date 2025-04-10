let fetch = require('node-fetch')

let handler = async (m, { Text, usedPrefix, command }) => {
      
        let res = await fetch(`https://api.betabotz.eu.org/api/webzone/samehadaku-release?apikey=${lann}`);
        const json = await res.json();
        const sunday = json.result.sunday;
        const monday = json.result.monday;
        const tuesday = json.result.tuesday;
        const wednesday = json.result.wednesday;
        const thursday = json.result.thursday;
        const friday = json.result.friday;
        const saturday = json.result.saturday;
        let caption = `乂 *SAMEHADAKU RELEASE* 乂\n\n`

        for (let Gegenstand of sunday) {
            caption += `
            ⦿ HARI MINGGU ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
        for (let Gegenstand of monday) {
            caption += `
            ⦿ HARI SENIN ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
        for (let Gegenstand of tuesday) {
            caption += `
            ⦿ HARI SELASA ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
        for (let Gegenstand of wednesday) {
            caption += `
            ⦿ HARI RABU ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
        for (let Gegenstand of thursday) {
            caption += `
            ⦿ HARI KAMIS ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
        for (let Gegenstand of friday) {
            caption += `
            ⦿ HARI JUMAT ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
        for (let Gegenstand of saturday) {
            caption += `
            ⦿ HARI SABTU ⦿ 
◦ id: ${Gegenstand.id}
◦ slug: ${Gegenstand.slug}
◦ date: ${Gegenstand.date}
◦ author: ${Gegenstand.author}
◦ type: ${Gegenstand.type}
◦ url: ${Gegenstand.url}
◦ content: ${Gegenstand.content}
◦ featured_img_src: ${Gegenstand.featured_img_src}
◦ genre: ${Gegenstand.genre}
◦ east_score: ${Gegenstand.east_score}
◦ east_type: ${Gegenstand.east_type}
◦ east_schedule: ${Gegenstand.east_schedule}
◦ east_time: ${Gegenstand.east_time}
◦ title: ${Gegenstand.title}
◦ title: ${Gegenstand.title}

    `;
        }
       
        conn.relayMessage(m.chat, {
            extendedTextMessage: {
                Text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: `https://telegra.ph/file/712fb213f59599c0e7ea7.jpg`,
                        sourceUrl: '',
                    }
                }, mentions: [m.sender]
            }
        }, {})
    } 
handler.help = ['samehadarilis']
handler.tags = ['internet']
handler.command = /^(samehadarilis)$/i
handler.limit = true
handler.group = true

module.exports = handler
