let handler = async (m, { conn, text }) => {  
    let monsters = [    
        { area: 1, name: "Goblin" },    
        { area: 1, name: "Slime" },    
        { area: 1, name: "Wolf" },    
        { area: 2, name: "Nymphe" },    
        { area: 2, name: "Skelett" },    
        { area: 2, name: "Wolf" },    
        { area: 3, name: "Baby Dämon" },    
        { area: 3, name: "Gespenst" },    
        { area: 3, name: "Zombie" },    
        { area: 4, name: "Imp" },    
        { area: 4, name: "Hexe" },    
        { area: 4, name: "Zombie" },    
        { area: 5, name: "Ghoul" },    
        { area: 5, name: "Riesenskorpion" },    
        { area: 5, name: "Einhorn" },    
        { area: 6, name: "Baby Roboter" },    
        { area: 6, name: "Zauberer" },    
        { area: 6, name: "Einhorn" },    
        { area: 7, name: "Cecaelia" },    
        { area: 7, name: "Riesige Piranha" },    
        { area: 7, name: "Meerjungfrau" },    
        { area: 8, name: "Riesenkrokodil" },    
        { area: 8, name: "Nereide" },    
        { area: 8, name: "Meerjungfrau" },    
        { area: 9, name: "Dämon" },    
        { area: 9, name: "Harpyie" },    
        { area: 9, name: "Killer Roboter" },    
        { area: 10, name: "Dullahan" },    
        { area: 10, name: "Manticore" },    
        { area: 10, name: "Killer Roboter" },    
        { area: 11, name: "Baby Drache" },    
        { area: 11, name: "Junger Drache" },    
        { area: 11, name: "Schuppiger Baby Drache" },    
        { area: 12, name: "Kleiner Drache" },    
        { area: 12, name: "Nicht so junger Drache" },    
        { area: 12, name: "Schuppiger Kleiner Drache" },    
        { area: 13, name: "Definitiv nicht so junger Drache" },    
        { area: 13, name: "Teenager Drache" },    
        { area: 13, name: "Schuppiger Teenager Drache" },  
    ]  

    let player = global.db.data.users[m.sender]  
    let pengirim = m.sender.split("@")[0]
    
    let __timers = (new Date - global.db.data.users[m.sender].lasthunt)    
    let _timers = (1200000 - __timers)    
    let timers = clockString(_timers)    
    let area_monsters = monsters[Math.floor(Math.random() * monsters.length)]    
    let monster = area_monsters.name    
    area_monsters = area_monsters.area    
    let monsterName = monster.toUpperCase()    

    if (new Date - global.db.data.users[m.sender].lasthunt > 1200000) {        
        let coins = parseInt(Math.floor(Math.random() * 100000))        
        let exp = parseInt(Math.floor(Math.random() * 10000))        
        let _healing = `${Math.floor(Math.random() * 100)}`.trim()        
        let healing = (_healing * 1)        

        player.Gesundheit -= healing        
        player.lasthunt = new Date * 1 // hunt time 2 minutes        

        if (player.Gesundheit < 0) {            
            let msg = `*@${pengirim}* Du wurdest von ${monsterName} getötet.`            
            if (player.Stufe > 0) {                
                if (player.sword > 0) {                    
                    player.Stufe -= 1                    
                    player.sword -= 5                    
                    player.exp -= exp * 1                    
                    msg += `\nDein Stufe ist um 1 gesenkt worden, weil du im Kampf gestorben bist!\nDein Schwert hat 5 Schaden verloren, weil du im Kampf gestorben bist!`                
                }            
            }            
            player.Gesundheit = 100            
            conn.reply(m.chat, msg, m)            
            return        
        }        

        player.Münzen += coins * 1        
        player.exp += exp * 1        
        global.db.data.users[m.sender].tiketcoin += 1        

        let nachricht = `Erfolgreich gefunden *${monsterName}* *@${pengirim}*, du hast es getötet und get:\n${new Intl.NumberFormat('de-DE').format(coins)} Geld\n${new Intl.NumberFormat('de-DE').format(exp)} XP\nVerloren -${healing} Leben, Übrig ${player.Gesundheit} Leben\n+1 Ticketcoin`        
        conn.reply(m.chat, nachricht, m)    

    } else m.reply(`Bitte warte noch *${timers}* bis du wieder auf die Jagd gehen kannst.`)} 

handler.help = ['hunter'] 
handler.tags = ['rpg'] 
handler.command = /^hunter/i 
handler.limit = true 
handler.group = true 
handler.rpg = true 
handler.fail = null

module.exports = handler    

function clockString(ms) {        
    let h = Math.floor(ms / 3600000)        
    let m = Math.floor(ms / 60000) % 60        
    let s = Math.floor(ms / 1000) % 60        
    console.log({ms,h,m,s})        
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
