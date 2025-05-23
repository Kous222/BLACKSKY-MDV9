const { trimUndefined } = require('@adiwajshing/baileys');
let fetch = require('node-fetch')
const axios = require('axios');


let handler = m => m

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// DOWNLOADER TIKTOD
async function herunterladenTikTok(Link, m) {
	try {
		if (global.db.data.users[m.sender].limit > 0) {
			const response = await fetch(`https://api.betabotz.eu.org/api/herunterladen/tiktok?url=${Link}&apikey=${lann}`);
			global.db.data.users[m.sender].limit -= 1
			const data = await response.json();
			if (!data.result.Video) {
				return;
			}
			if (data.result.Video.length > 1) {

				for (let v of data.result.Video) {
					await conn.sendFile(m.chat, v, null, `*Tiktok Downloader*`, m);
					await sleep(3000)
				}
			} else {
				await conn.sendMessage(m.chat, { Video: { url: data.result.Video[0] }, caption: `*Tiktok Downloader*` }, { mention: m })
			}
		}
		else {
			conn.reply(m.chat, 'limit du verbraucht!', m);
		}
		return;
	} catch (error) {
		console.error(error);
	}
}

// DOWNLOADER DOUYIN
async function herunterladenDouyin(Link, m) {
	try {
		if (global.db.data.users[m.sender].limit > 0) {
			const response = await fetch(`https://api.betabotz.eu.org/api/herunterladen/douyin?url=${Link}&apikey=${lann}`);
			const data = await response.json();
			if (!data.result.Video) {
				return;
			}
			if (data.result.Video.length > 1) {
				global.db.data.users[m.sender].limit -= 1
				for (let v of data.result.Video) {
					await conn.sendFile(m.chat, v, null, `*Douyin Downloader*`, m);
					await sleep(3000)
				}
			} else {
				await conn.sendMessage(m.chat, { Video: { url: data.result.Video[0] }, caption: `*Douyin Downloader*` }, { mention: m })
			}
		}
		else {
			conn.reply(m.chat, 'limit du verbraucht!', m);
		}
		return;
	} catch (error) {
		console.error(error);
	}
}

//terabox herunterladener
// async function herunterladentera(Link, m) {
// 	try {
//         if (global.db.data.users[m.sender].limit > 0) {
// 	    const response = await fetch(`https://api.botcahx.eu.org/api/herunterladen/terabox?url=${Link}&apikey=${btc}`);        
// 		 if (!response.result || response.result.length === 0) {
//             throw 'No files found in the response'
//         }

//         let msg = `乂 *T E R A B O X   D O W N L O A D E R*\n\n`
//         msg += `Found ${response.result.length} file(s):\n\n`

//         for (let file of response.result) {
//             if (!file.files || !file.files[0]) continue
//             let fdata = file.files[0]
//             msg += ` ◦ *name :* ${file.name}\n`
//             msg += ` ◦ *Size :* ${formatSize(fdata.size)}\n`
//             msg += ` ◦ *Created :* ${formatDate(file.created)}\n\n`
//         }

//         await conn.sendMessage(m.chat, {
//             text: msg,
//             contextInfo: {
//                 externalAdReply: {
//                     title: 'Terabox Downloader',
//                     body: `Processing ${data.result.length} file(s)`,
//                     thumbnailUrl: 'https://pomf2.andere.la/f/ihnv9wct.jpg',
//                     sourceUrl: null,
//                     mediaType: 1,
//                     renderLargerThumbnail: true
//                 }
//             }
//         })

//         const total = data.result.length
//         for (let i = 0; i < data.result.length; i++) {
//             const file = data.result[i]
//             if (!file.files || !file.files[0]) continue

//             let fdata = file.files[0]
//                 let response = await fetch(fdata.url)
//                 let buffer = await response.buffer()

//                 let queue = `*Antrian:* ${i + 1}-${total}\n`               
//                 await conn.sendFile(m.sender, buffer, file.name, queue, m)

//                 if (i === data.result.length - 1) {
//                     await conn.reply(m.sender, '*DONE*', m)
//                 }

//                 if (i < data.result.length - 1) {
//                     await new Promise(resolve => setTimeout(resolve, 5000))
//                 }
// 			}

// function formatSize(size) {
//     const units = ['B', 'KB', 'MB', 'GB', 'TB']
//     let i = 0
//     while (size >= 1024 && i < units.length - 1) {
//         size /= 1024
//         i++
//     }
//     return `${size.toFixed(2)} ${units[i]}`
// }

// function formatDate(dateString) {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     })
// }
// 		}

//     else {
//         conn.reply(m.chat, 'limit du verbraucht!', m);
//     } 
// 		return;
// 	} catch (error) {
// 		console.error(error);
// 	}
// }


//pinterest herunterladener
async function herunterladenpin(Link, m) {
	try {
		if (global.db.data.users[m.sender].limit > 0) {
			const response = await fetch(`https://api.betabotz.eu.org/api/herunterladen/pinterest?url=${Link}&apikey=${lann}`);
			const res = await response.json();

			let { media_type, image, title, pin_url, Video } = res.result.data;
			global.db.data.users[m.sender].limit -= 1
			if (media_type === 'Video/mp4') {
				await conn.sendMessage(m.chat, {
					Video: { url: Video },
					caption: `*Title:* ${title || 'Nein verfügbar'}\n*Mediatype:* ${media_type}\n*Source Url:* ${pin_url}`
				});
			} else {
				await conn.sendMessage(m.chat, {
					image: { url: image },
					caption: `*Title:* ${title || 'Nein verfügbar'}\n*Mediatype:* ${media_type}\n*Source Url:* ${pin_url}`
				});
			}
		}
		else {
			conn.reply(m.chat, 'limit du verbraucht!', m);
		}
		return;
	} catch (error) {
		console.error(error);
	}
}

//youtube herunterladener
async function herunterladenyt(Link, m) {
	try {
		if (global.db.data.users[m.sender].limit > 0) {
			const response = await axios.get(`https://api.betabotz.eu.org/api/herunterladen/ytmp4?url=${Link}&apikey=${lann}`);
			const res = response.data.result;
			var { mp4, id, title, source, duration, mp3 } = res;
			let capt = `YT MP4*\n\n`;
			capt += `◦ *id* : ${id}\n`;
			capt += `◦ *tittle* : ${title}\n`;
			capt += `◦ *source* : ${source}\n`;
			capt += `◦ *duration* : ${duration}\n`;
			capt += `\n`;
			global.db.data.users[m.sender].limit -= 1
			await conn.sendMessage(m.chat, {
				document: { url: mp3 },
				mimetype: 'Audio/mpeg',
				fileName: `${title}.mp3`,
			}, { quoted: m });
			await conn.sendFile(m.chat, mp4, null, capt, m);

		}
		else {
			conn.reply(m.chat, 'limit du verbraucht!', m);
		}
		return;
	} catch (error) {
		console.error(error);
	}
}

// DOWNLOADER INSTAGRAM 
async function herunterladenInstagram(Link, m) {
	try {
		if (global.db.data.users[m.sender].limit > 0) {
			const response = await fetch(`https://api.betabotz.eu.org/api/herunterladen/igdowloader?url=${Link}&apikey=${lann}`);
			let message = await response.json()
			global.db.data.users[m.sender].limit -= 1
			for (let i of message.message) {
				conn.sendFile(m.chat, i._url, null, `*Instagram Downloader*`, m)
			}
		}
		else {
			conn.reply(m.chat, 'limit du verbraucht!', m);
		}
	} catch (err) {
		m.reply(`${eror}`)
	}
}

// DOWNLOADER FACEBOOK 
async function herunterladenFacebook(Link, m) {
	try {
		if (global.db.data.users[m.sender].limit > 0) {
			const response = await fetch(`https://api.betabotz.eu.org/api/herunterladen/fbdown?url=${Link}&apikey=${lann}`);
			var js = await response.json()
			global.db.data.users[m.sender].limit -= 1
			conn.sendFile(m.chat, js.result[1]._url, 'fb.mp4', '', m);
		}
		else {
			conn.reply(m.chat, 'limit du verbraucht!', m);
		}
	} catch (error) {
		console.error(error);
	}
}
// DOWNLOADER SPOTIFY
async function _spotify(Link, m) {
	try {
		if (global.db.data.users[m
			.sender].limit >
			0) {
			const res = await fetch(`https://api.betabotz.eu.org/api/herunterladen/spotify?url=${Link}&apikey=${lann}`)
			global.db.data.users[m.sender].limit -= 1
			let jsons = await res.json()
			const {
				thumbnail,
				title,
				name,
				duration,
				url
			} = jsons.result.data
			const {
				id,
				type
			} = jsons.result.data.artist
			await conn.sendMessage(m.chat, {
				Audio: { url: url }, mimetype: 'Audio/mpeg', contextInfo: {
					externalAdReply: {
						title: title,
						body: "",
						thumbnailUrl: thumbnail,
						sourceUrl: url,
						mediaType: 1,
						showAdAttribution: true,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		}
		else {
			conn.reply(m.chat,
				"Limit du verbraucht!",
				m);
		}
	}
	catch (error) {
		console.error(error);
	}
}
// DOWNLOADER TWITTER
async function _twitter(Link, m) {
	try {
		if (global.db.data.users[m
			.sender].limit >
			0) {
			const api = await fetch(`https://api.betabotz.eu.org/api/herunterladen/twitter2?url=${Link}&apikey=${lann}`);
			global.db.data.users[m.sender].limit -= 1
			const res = await api.json();
			const mediaURLs = res.result.mediaURLs;

			const capt = `*Username: ${res.result.user_name} ${res.result.user_screen_name}*\n*Title: ${res.result.text}*\n*Replies: ${res.result.replies}*\n*Retweet: ${res.result.retweets}*`;

			for (const url of mediaURLs) {
				const response = await fetch(url);
				const buffer = await response.buffer();
				await delay(3000)//3 Sekunden jeda damit nicht spam
				conn.sendFile(m.chat, buffer, null, capt, m);
			}
			function delay(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			}

		}
		else {
			conn.reply(m.chat,
				"Limit du verbraucht!",
				m);
		}
	}
	catch (error) {
		console.error(error);
	}
}
// DOWNLOADER THREADS
async function _threads(Link, m) {
	try {
		if (global.db.data.users[m
			.sender].limit >
			0) {
			const api = await fetch(`https://api.betabotz.eu.org/api/herunterladen/threads?url=${Link}&apikey=${lann}`).then(results => results.json());
			global.db.data.users[m
				.sender]
				.limit -= 1;
			const foto = api.result.image_urls[0] || null;
			const Video = api.result.video_urls[0] || null;
			if (Video) {
				try {
					conn.sendFile(m.chat, Video.herunterladen_url, 'threads.mp4', '*THREADS DOWNLOADER*', m);
				} catch (e) {
					throw `Medien Video nicht gefunden!`;
				}
			} else if (foto) {
				try {
					conn.sendFile(m.chat, foto, 'threads.jpeg', '*THREADS DOWNLOADER*', m);
				} catch (e) {
					throw `Medien foto nicht gefunden!`;
				}
			} else {
				throw `Konten nicht gefunden!`;
			}

		}
		else {
			conn.reply(m.chat,
				"Limit du verbraucht!",
				m);
		}
	}
	catch (error) {
		console.error(error);
	}
}
// DOWNLOADER CAPCUT
async function _capcut(Link, m) {
	try {
		if (global.db.data.users[m
			.sender].limit >
			0) {
			const response = await fetch(`https://api.betabotz.eu.org/api/herunterladen/capcut?url=${Link}&apikey=${lann}`);
			global.db.data.users[m.sender].limit -= 1
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.Status}`);
			}

			const res = await response.json();
			const {
				Video,
				title,
				owner
			} = res.result;

			await conn.sendFile(m.chat, Video, 'capcut.mp4', `Title: ${title}\n\nProfile: ${owner}`, m);
		}
		else {
			conn.reply(m.chat,
				"Limit du verbraucht!",
				m);
		}
	}
	catch (e) {
		console.error(e);
	}
}
// DOWNLOADER SNACKVIDEO
async function _snackvideo(url, m) {
	try {
		if (global.db.data.users[m
			.sender].limit >
			0) {
		}
		else {
			conn.reply(m.chat,
				"Limit du verbraucht!",
				m);
		}
	}
	catch (e) {
		console.log(e);
	}
}

/**=========================================**/

handler.before = async function (m, { conn, isPrems }) {
	let chat = global.db.data.chats[m.chat];
	if (!chat.autodl) return; 

	if (!m.text) {
		return;
	}

	if (m.text.startsWith('=>') || m.text.startsWith('>') || m.text.startsWith('.') || m.text.startsWith('#') || m.text.startsWith('!') || m.text.startsWith('/') || m.text.startsWith('\/')) {
		return;
	}

	if (chat.isBanned) {
		return;
	}

	if (!m.text.includes('http')) {
		return;
	}

	let text = m.text.replace(/\n+/g, ' ');

	const tiktokRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/i;
	const douyinRegex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.|v\.)?(?:douyin\.com\/)(?:\S+)?$/i;
	const instagramRegex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/i;
	const facebookRegex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/i;
	const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w\-]{11})(?:\?[\S]*)?$/i;
	// const pinterestRegex = /^(?:https?:\/\/)?(?:[a-z]{2}\.)?pinterest\.com\/pin\/(\d+)\/?$/i;
	const pinterestRegex = /^(?:https?:\/\/)?(?:pin\.it)\/([a-zA-Z0-9]+)$/i;
	const spotifyRegex = /^(?:https?:\/\/)?(?:open\.spotify\.com\/track\/)([a-zA-Z0-9]+)(?:\S+)?$/i;
	const twitterRegex = /^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)\/Status\/(\d+)(?:\?[^#]*)?(?:#.*)?$/i;
	const threadsRegex = /^(https?:\/\/)?(www\.)?threads\.net(\/[^\s]*)?(\?[^\s]*)?$/;
	const capcutRegex = /^https:\/\/www\.capcut\.com\/(t\/[A-Za-z0-9_-]+\/?|template-detail\/\d+\?(?:[^=]+=[^&]+&?)+)$/;
	const snackvideoRegex = /^(https?:\/\/)?s\.snackvideo\.com\/p\/[a-zA-Z0-9]+$/i;
	// const teraboxRegex = /^(?:https?:\/\/)?(?:www\.)?terabox\.com\/s\/([\w\-]+)(?:\?[\S]*)?$/i;

	if (text.match(tiktokRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await herunterladenTikTok(text.match(tiktokRegex)[0], m);
	} else if (text.match(douyinRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await herunterladenDouyin(text.match(douyinRegex)[0], m);
	} else if (text.match(instagramRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await herunterladenInstagram(text.match(instagramRegex)[0], m);
	} else if (text.match(facebookRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await herunterladenFacebook(text.match(facebookRegex)[0], m);
	}
	else if (text.match(youtubeRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await herunterladenyt(text.match(youtubeRegex)[0], m);
	}
	else if (text.match(pinterestRegex)) {
		conn.sendMessage(m.chat, {
			react: {
				text: '✅',
				key: m.key,
			}
		})
		await herunterladenpin(text.match(pinterestRegex)[0], m);
	}
	// else if (text.match(teraboxRegex)) {
	// 	conn.sendMessage(m.chat, {
	// 		react: {
	// 			text: '✅',
	// 			key: m.key,
	// 		}
	// 	})
	// 	await herunterladentera(text.match(teraboxRegex)[0], m);
	// }
	else if (text.match(
		spotifyRegex)) {
		conn.sendMessage(m
			.chat, {
			react: {
				text: "✅",
				key: m
					.key,
			},
		});
		await _spotify(text
			.match(
				spotifyRegex
			)[0], m);
	}
	else if (text.match(
		twitterRegex)) {
		conn.sendMessage(m
			.chat, {
			react: {
				text: "✅",
				key: m
					.key,
			},
		});
		await _twitter(text
			.match(
				twitterRegex
			)[0], m);
	}
	else if (text.match(
		threadsRegex)) {
		conn.sendMessage(m
			.chat, {
			react: {
				text: "✅",
				key: m
					.key,
			},
		});
		await _threads(text
			.match(
				threadsRegex
			)[0], m);
	}
	else if (text.match(
		capcutRegex)) {
		conn.sendMessage(m
			.chat, {
			react: {
				text: "✅",
				key: m
					.key,
			},
		});
		await _capcut(text
			.match(
				capcutRegex
			)[0], m);
	}
	else if (text.match(
		snackvideoRegex)) {
		conn.sendMessage(m
			.chat, {
			react: {
				text: "✅",
				key: m
					.key,
			},
		});
		await _snackvideo(text
			.match(
				snackvideoRegex
			)[0], m);
	}
	return !0;
}


module.exports = handler