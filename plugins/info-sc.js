let handler = async (m, { conn }) => {
let ye = `@${m.sender.split`@`[0]}`
let esce = `
hallo ${ye} Bot Dies Mengbenutze Script :\n• https://github.com/ERLANRAHMAT/BETABOTZ-MD2 
`
m.Antworten(esce)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i

module.exports = handler
