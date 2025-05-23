let handler = async (m, { conn }) => {    
    let __timers = (new Date - global.db.data.users[m.sender].kerjaempat)    
    let _timers = (3600000 - __timers)    
    let timers = clockString(_timers)    
    let name = conn.getName(m.sender)    
    let user = global.db.data.users[m.sender]    
    let id = m.sender    
    let arbeiten = 'Töten'    
    conn.Mission = conn.Mission ? conn.Mission : {}    
    if (id in conn.Mission) {        
        conn.reply(m.chat, `Schließe zuerst die Mission ${conn.Mission[id][0]} ab`, m)        
        throw false    
    }    
    if (new Date - global.db.data.users[m.sender].kerjaempat > 3600000) {        
        let randomaku4 = Math.floor(Math.random() * 10)        
        let randomaku5 = Math.floor(Math.random() * 10)        
        let rbrb4 = (randomaku4 * 100000)        
        let rbrb5 = (randomaku5 * 1000)        
        var dimas = `🕵️ target finden.....`.trim()        
        var dimas2 = `⚔️ Körper durchbohren.....`.trim()        
        var dimas3 = `☠️ target gestorben\nUnd du nimmst seine Sachen`.trim()        
        var dimas4 = `💼 result des Mordes....`.trim()        
        var hsl = `*—[ result von ${name} ]—*➕ 💹 Geld = [ ${rbrb4} ]➕ ✨ Exp = [ ${rbrb5} ]➕ 👮 Strafe +1➕ ☑️ Mission erfolgreich = +1`.trim()        
        user.Münzen += rbrb4        
        user.exp += rbrb5        
        user.warn += 1        
        conn.Mission[id] = [            
            arbeiten,            
            setTimeout(() => {                
                delete conn.Mission[id]            
            }, 27000)        
        ]        
        setTimeout(() => {            
            m.reply(hsl)        
        }, 27000)        
        setTimeout(() => {            
            m.reply(dimas4)        
        }, 25000)        
        setTimeout(() => {            
            m.reply(dimas3)        
        }, 20000)        
        setTimeout(() => {            
            m.reply(dimas2)        
        }, 15000)        
        setTimeout(() => {            
            m.reply(dimas)        
        }, 10000)        
        setTimeout(() => {            
            m.reply('🔍search nach Mordziel.....')        
        }, 0)        
        user.kerjaempat = new Date * 1    
    } else m.reply(`Bitte warten Sie für ${timers}, um die Mission abzuschließen.`)} 

handler.help = ['hitman'] 
handler.tags = ['rpg'] 
handler.command = /^(töten|hitman)$/i 
handler.register = true 
handler.group = true 
handler.Stufe = 10 
handler.rpg = true 

module.exports = handler    

function clockString(ms) {        
    let h = Math.floor(ms / 3600000)        
    let m = Math.floor(ms / 60000) % 60        
    let s = Math.floor(ms / 1000) % 60        
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
