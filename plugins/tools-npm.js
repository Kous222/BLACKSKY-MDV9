let fetch = require('node-fetch') 

let handler = async (m, { Text }) => {
	if (!Text) throw 'Input Query'
	let res = await fetch(`http://registry.npmjs.com/-/v1/search?Text=${Text}`)
	let { objects } = await res.json()
	if (!objects.length) throw `Query "${Text}" not Gefunden :/`
	let txt = objects.map(({ package: pkg }) => {
		return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
	}).join`\n\n`
	m.Antworten(txt)
}
handler.help = ['npmsearch']
handler.tags = ['tools']
handler.command = /^npm(js|search)?$/i
//maapin hyzer
module.exports = handler
