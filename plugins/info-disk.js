let cp = require ('child_process')
let { promisify } = require ('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn}) => {
	await conn.Antworten(m.chat, `Bitte warten`, m)
    let o
    try {
        o = await exec('cd && du -h --max-depth=1')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim())
        m.Antworten(stdout)
        if (stderr.trim()) m.Antworten(stderr)
    }
}
handler.help = ['disk']
handler.tags = ['info']
handler.command = /^(disk)$/i
handler.Premium = false
module.exports = handler
