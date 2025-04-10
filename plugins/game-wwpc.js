const {
    emoji_role,
    sesi,
    playerOnGame,
    playerOnRoom,
    playerExit,
    dataPlayer,
    dataPlayerById,
    getPlayerById,
    getPlayerById2,
    killWerewolf,
    killww,
    dreamySeer,
    sorcerer,
    protectGuardian,
    roleShuffle,
    roleChanger,
    roleAmount,
    roleGenerator,
    addTimer,
    startGame,
    playerHidup,
    playerMati,
    vote,
    voteResult,
    clearAllVote,
    getWinner,
    win,
    pagi,
    malam,
    Fähigkeit,
    voteStart,
    voteDone,
    voting,
    run,
    run_vote,
    run_malam,
    run_pagi
} = require('../lib/werewolf.js')

let handler = async (m, { conn, command, usedPrefix, args }) => {
    let { sender, chat } = m
    conn.werewolf = conn.werewolf ? conn.werewolf : {}
    let ww = conn.werewolf
    let value = (args[0] || '').toLowerCase()
    let target = args[1]

    if (playerOnGame(sender, ww) === false)
        return m.reply("Du bist nicht in einer Spielsitzung")
    if (dataPlayer(sender, ww).Status === true)
        return m.reply("Fertigkeit wurde bereits benutzt, die Fähigkeit kann nur einmal pro Nacht verwendet werden")
    if (dataPlayer(sender, ww).isdead === true)
        return m.reply("Du bist bereits tot")
    if (!target || target.length < 1 || target.split('').length > 2) 
        return m.reply(`Bitte gib die Spielernummer an \nBeispiel: \n${usedPrefix + command} kill 1`)
    if (isNaN(target)) 
        return m.reply("Verwende nur Nummern")
    let byId = getPlayerById2(sender, parseInt(target), ww)
    if (byId.db.isdead === true) 
        return m.reply("Spieler ist bereits tot")
    if (byId.db.id === sender)
        return m.reply("Du kannst die Fähigkeit nicht auf dich selbst anwenden")
    if (byId === false) 
        return m.reply("Spieler ist nicht registriert")
    if (value === "kill") {
        if (dataPlayer(sender, ww).role !== "werewolf")
            return m.reply("Diese Rolle ist nicht für dich")

        if (byId.db.role === "sorcerer") 
            return m.reply("Du kannst diese Fähigkeit nicht gegen einen Freund einsetzen")

            return m.reply("Spieler " + parseInt(target) + " erfolgreich getötet").then(() => {
                dataPlayer(sender, ww).Status = true
                killWerewolf(sender, parseInt(target), ww)
            })
    } else if (value === "dreamy") {
        if (dataPlayer(sender, ww).role !== "seer") 
            return m.reply("Diese Rolle ist nicht für dich")

        let dreamy = dreamySeer(sender, parseInt(target), ww)
        return m.reply(`Die Identität von Spieler ${target} wurde erfolgreich aufgedeckt: ${dreamy}`).then(() => {
                dataPlayer(sender, ww).Status = true
        })
    } else if (value === "deff") {
        if (dataPlayer(sender, ww).role !== "guardian") 
            return m.reply("Diese Rolle ist nicht für dich")

        return m.reply(`Spieler ${target} wurde erfolgreich geschützt`).then(() => {
            protectGuardian(sender, parseInt(target), ww)
            dataPlayer(sender, ww).Status = true
        })
    } else if (value === "sorcerer") {
        if (dataPlayer(sender, ww).role !== "sorcerer") 
            return m.reply("Diese Rolle ist nicht für dich")

        let sorker = sorcerer(sender, parseInt(target), ww)
        return m.reply(`Die Identität von Spieler ${target} wurde erfolgreich aufgedeckt: ${sorker}`).then(() => {
            dataPlayer(sender, ww).Status = true
        })
    }
}
handler.command = /^((ww|werewolf)pc)$/i
handler.private = true
module.exports = handler
