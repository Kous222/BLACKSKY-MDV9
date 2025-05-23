var {
	format
} = require("util");
var {
	Bild
} = require("node-webpmux");

var handler = async (m) => {
	if (!m.quoted) return m.Antworten('Tag Sticker sein/ihr!')
	if (/Sticker/.test(m.quoted.mtype)) {
		var Bild = new Bild()
		await Bild.load(await m.quoted.Herunterladen())
		m.Antworten(format(JSON.parse(Bild.exif.slice(22).toString())))
	}
};
handler.command = handler.help = ['getexif'];
handler.tags = ['Sticker'];
module.exports = handler;
