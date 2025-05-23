let handler = async (m, { conn, usedPrefix }) => {
         let paus = global.db.data.users[m.sender].paus 
         let kepiting = global.db.data.users[m.sender].kepiting
         let gurita = global.db.data.users[m.sender].gurita 
         let cumi = global.db.data.users[m.sender].cumi 
         let buntal = global.db.data.users[m.sender].buntal 
         let dory = global.db.data.users[m.sender].dory 
         let lumba = global.db.data.users[m.sender].lumba 
         let lobster = global.db.data.users[m.sender].lobster 
         let hiu = global.db.data.users[m.sender].hiu 
         let udang = global.db.data.users[m.sender].udang
         let ikan = global.db.data.users[m.sender].ikan 
         let orca = global.db.data.users[m.sender].orca 
         let pancingan = global.db.data.users[m.sender].pancingan
         let _pancingan = global.db.data.users[m.sender].anakpancingan 
         let dann = `
*Fischteich*
Hai: ${hiu}
Fisch: ${ikan}
Doktorfisch: ${dory}
Orca: ${orca}
Wal: ${paus}
Tintenfisch: ${cumi}
Krake: ${gurita}
Kugelfisch: ${buntal}
Garnele: ${udang}
Delfin: ${lumba}
Hummer: ${lobster}
Krabbe: ${kepiting}
`.trim()

conn.reply(m.chat, dann, m)
}

handler.help = ['kolam', 'teich', 'pool', 'fischteich']
handler.tags = ['rpg']
handler.command = /^(kolam|teich|pool|fischteich)$/i
handler.group = true
handler.rpg = true
module.exports = handler