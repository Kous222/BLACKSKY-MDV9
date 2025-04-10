// Main owner number - this has highest privileges
global.owner = ['4915563151347']  
// Moderators with elevated access
global.mods = ['4915563151347'] 
// Premium users
global.prems = ['4915563151347']
// Additional owner validation
global.validateOwner = (sender) => global.owner.includes(sender.split('@')[0])
global.nameowner = 'Martin'
global.numberowner = '4915563151347'
global.mail = 'support@tioprm.eu.org' 
global.gc = 'https://chat.whatsapp.com/G4f1fTpz9zL4EH3FyIcaPR'
global.instagram = 'https://instagram.com/erlanrahmat_14'
global.wm = '© Tio'
global.wait = '_*Bitte warten, wird verarbeitet...*_'
global.eror = '_*Serverfehler*_'
global.stiker_wait = '*⫹⫺ Sticker wird erstellt...*'
global.packname = 'Made With'
global.author = 'BLACKSKY-MD'
global.maxwarn = '3' // Maximum warnings before kick/ban
global.antiporn = true // Auto delete pesan porno (bot harus admin)
global.multiplier = 3.5 // Leveling difficulty multiplier (higher = slower leveling)

//INI WAJIB DI ISI!//
global.lann = 'Btz-jdyXQ' 
//Daftar terlebih dahulu https://api.betabotz.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = 'Btz-jdyXQ'
//Daftar https://api.botcahx.eu.org 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  btc: 'https://api.botcahx.eu.org'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': global.lann, 
  'https://api.botcahx.eu.org': global.btc //OPSIONAL
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})


