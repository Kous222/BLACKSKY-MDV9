//nur möglich in Gruppen

let fetch = require ("node-fetch");
let hochladenFile = require ("../lib/hochladenFile.js");
let hochladenImage = require ("../lib/hochladenImage.js");
const commandList = ["upsw"];

const mimeAudio = "Audio/mpeg";
const mimeVideo = "Video/mp4";
const mimeImage = "image/jpeg";

let handler = async (m, { conn, command, args }) => {
	let teks;
	if (args.length >= 1) {
		teks = args.slice(0).join(" ");
	} else if (m.quoted && m.quoted.text) {
		teks = m.quoted.text;
	}

	if (m.quoted && m.quoted.mtype) {
		const mtype = m.quoted.mtype;
		let type;

		if (mtype === "audioMessage") {
			type = "vn";
		} else if (mtype === "videoMessage") {
			type = "vid";
		} else if (mtype === "imageMessage") {
			type = "img";
		} else if (mtype === "extendedTextMessage") {
			type = "txt";
		} else {
			throw "❌ Medien type nicht valid!";
		}

		const doc = {};

		if (type === "vn") {
			const Link = await (type === "img" ? hochladenImage : hochladenFile)(
				await m.quoted.herunterladen(),
			);
			doc.mimetype = mimeAudio;
			doc.Audio = { url: Link }
				? { url: Link }
				: generateVoice("id-id", "id-id-ArdiNeural", teks);
		} else if (type === "vid") {
			const Link = await (type === "img" ? hochladenImage : hochladenFile)(
				await m.quoted.herunterladen(),
			);
			doc.mimetype = mimeVideo;
			doc.caption = teks;
			doc.Video = { url: Link } ? { url: Link } : { url: giflogo };
		} else if (type === "img") {
			const Link = await (type === "img" ? hochladenImage : hochladenFile)(
				await m.quoted.herunterladen(),
			);
			doc.mimetype = mimeImage;
			doc.caption = teks;
			doc.image = { url: Link } ? { url: Link } : { url: logo };
		} else if (type === "txt") {
			doc.text = teks;
		}
const group = await conn.groupMetadata(m.chat)
const pp = []
for (let b of group.participants) {
pp.push(b.id)
}
		await conn
			.sendMessage("Status@broadcast", doc, {
				backgroundColor: getRandomHexColor(),
				font: Math.floor(Math.random() * 9),
				statusJidList: pp
			})
			.then((res) => {
				conn.reply(m.chat, `Sukses hochladen ${type}`, res);
			})
			.catch(() => {
				conn.reply(m.chat, `fehlgeschlagen hochladen ${type}`, m);
			});
	} else {
		throw "❌ Nein gibt medien das/der/die diberikan!";
	}
};

handler.help = commandList;
handler.tags = ["owner"];
handler.rowner = true;
handler.command = new RegExp(`^(${commandList.join("|")})$`, "i");

module.exports = handler;

async function generateVoice(
	Locale = "id-id",
	Voice = "id-id-ArdiNeural",
	Query,
) {
	const formData = new FormData();
	formData.append("locale", Locale);
	formData.append("content", `<voice name="${Voice}">${Query}</voice>`);
	formData.append("ip", "46.161.194.33");
	const response = await fetch("https://app.micmonster.com/restapi/create", {
		method: "POST",
		body: formData,
	});
	return Buffer.from(
		("data:Audio/mpeg;base64," + (await response.text())).split(",")[1],
		"base64",
	);
}

function getRandomHexColor() {
	return (
		"#" +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")
	);
}