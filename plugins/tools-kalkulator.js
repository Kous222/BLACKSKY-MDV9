let handler = async (m, { conn, Text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.Antworten('Hmmm...ngecheat?')
  }
  let val = Text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
  try {
    console.log(val)
    let result = (new Function('return ' + val))()
    if (!result) throw result
    m.Antworten(`*${format}* = _${result}_`)
  } catch (e) {
    if (e == undefined) throw 'Isinya?'
    throw 'Format salah, nur 0-9 und Simbol -, +, *, /, ×, ÷, π, e, (, ) das/der/die disupport'
  }
}
handler.help = ['kalkulator <FRAGE>', 'rechner', 'berechnen']
handler.tags = ['tools']
handler.command = /^(((calc(ulat(e|or))?|kalk(ulator)?)$|rechner|berechnen)|rechner|berechnen)/i
handler.exp = 5
handler.register = false
module.exports = handler
