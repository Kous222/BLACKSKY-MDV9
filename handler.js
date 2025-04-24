const simple = require('./lib/simple')
const util = require('util')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

// Initialisiere globale Konfiguration mit Standardwerten
// Besitzernummern sollten von der App gesetzt werden, bevor dieser Handler geladen wird
if (!global.owner) {
    global.owner = ['628123456789'] // Standard-Besitzer, sollte durch die eigene Nummer in der App ersetzt werden
    console.log("Warnung: Standardwert für Besitzer wird verwendet. Bitte setze deine eigene Nummer in der Bot-Konfiguration.")
}

// Leistungsoptimierungen

// Befehlscache für schnelleres Matching - speichert Befehlsvergleichsergebnisse
const commandCache = new Map();
const COMMAND_CACHE_MAX = 300; // Erhöhte Cache-Größe für bessere Leistung

// Cache für Benutzerdaten - häufig abgerufene Benutzerinformationen
const userDataCache = new Map();
const USER_CACHE_TTL = 180000; // 3 Minuten für besseres Caching

// Cache für Präfix-Regex-Muster - vermeidet erneutes Kompilieren gleicher Regex
const prefixRegexCache = new Map();

// Vorkompilierte häufige Regex-Muster
const COMMON_PATTERNS = {
    // Befehlspräfixe
    dotPrefix: new RegExp('^[\\.]'),
    exclamationPrefix: new RegExp('^[\\!]'),
    slashPrefix: new RegExp('^[/]'),
    // Nachrichtentypen
    imageType: new RegExp('image|bild', 'i'),
    videoType: new RegExp('video|vid', 'i'),
    audioType: new RegExp('audio|mp3|voice', 'i'),
    // Häufige Befehlsübereinstimmungen
    helpCommand: new RegExp('^(help|hilfe|menu|befehle|liste)$', 'i'),
    infoCommand: new RegExp('^(info|über|status)$', 'i'),
    ownerCommand: new RegExp('^(besitzer|ersteller|admin)$', 'i')
};

// Häufig verwendete Plugin-Matching-Hilfsprogramme - für Geschwindigkeit optimiert
const str2Regex = str => {
    if (!str) return new RegExp('');
    // Die meisten häufigen Muster sind jetzt in COMMON_PATTERNS vorkompiliert
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
}

// Diese Besitzernummern haben vollen Zugriff auf den Bot
console.log("Aktuelle(r) Bot-Besitzer:", global.owner)

// Caches regelmäßig bereinigen
setInterval(() => {
    const now = Date.now();
    
    // Benutzer-Cache bereinigen
    for (const [key, { timestamp }] of userDataCache.entries()) {
        if (now - timestamp > USER_CACHE_TTL) {
            userDataCache.delete(key);
        }
    }
    
    // Befehlscache-Größe begrenzen
    if (commandCache.size > COMMAND_CACHE_MAX) {
        // Entferne die ältesten 20% der Einträge
        const keysToRemove = Array.from(commandCache.keys())
            .slice(0, Math.floor(commandCache.size * 0.2));
        
        for (const key of keysToRemove) {
            commandCache.delete(key);
        }
    }
}, 30000); // Alle 30 Sekunden ausführen

module.exports = {
    // Hauptnachrichtenverarbeitungshandler (Main message processing handler)
    async handler(chatUpdate) {
        if (global.db.data == null) await loadDatabase()
        this.msgqueque = this.msgqueque || []
        // console.log(chatUpdate)
        if (!chatUpdate) return
        // if (chatUpdate.messages.length > 2 || !chatUpdate.messages.length) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        //console.log(JSON.stringify(m, null, 4))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            // console.log(m)
            m.exp = 0
            m.limit = false
            
            // Frühe Bann-Prüfung - Prüfe nur Befehlsnachrichten von gebannten Benutzern (Early ban check - only check command messages from banned users)
            try {
                if (m.sender) {
                    // Prüfe zuerst, ob es sich um einen Befehl handelt (First check if it's a command)
                    const isCommand = m.text && (m.text.startsWith('.') || m.text.startsWith('/') || m.text.startsWith('!'))
                    
                    // Nur Befehle prüfen - normale Nachrichten von gebannten Benutzern ignorieren (Only check commands - ignore normal messages from banned users)
                    if (isCommand) {
                        let userBan = global.db.data.users[m.sender]
                        if (userBan) {
                            // Befehlsname extrahieren (Extract command name)
                            let messageCommand = m.text.trim().split(' ')[0].slice(1).toLowerCase();
                            
                            // Prüfe, ob es der Besitzer ist (Check if it's the owner)
                            const isOwnerUser = global.owner.some(owner => m.sender.includes(owner.replace(/[^0-9]/g, '')))
                            const isUnbanCommand = messageCommand === 'unban'
                            
                            // Globale Bann-Prüfung (Global ban check)
                            if (userBan.banned === true) {
                                // Erlaube nur dem Besitzer, den Entbann-Befehl zu verwenden (Only allow the owner to use the unban command)
                                if (!(isOwnerUser && isUnbanCommand)) {
                                    console.log(`Blockierter Befehl von gebanntem Benutzer: ${m.sender} - Befehl: ${m.text}`)
                                    m.reply(`❌ Du bist gebannt und kannst keine Bot-Befehle verwenden.\nNur ein Bot-Admin kann dich entbannen.`)
                                    return
                                }
                            }
                            
                            // Prüfe auf temporären Bann (Check for temporary ban)
                            if (userBan.bannedTime && userBan.bannedTime > Date.now()) {
                                // Erlaube nur dem Besitzer, den Entbann-Befehl zu verwenden (Only allow the owner to use the unban command)
                                if (!(isOwnerUser && isUnbanCommand)) {
                                    const remainingTime = Math.ceil((userBan.bannedTime - Date.now()) / 1000 / 60) // Minuten (Minutes)
                                    console.log(`Blockierter Befehl von temporär gebanntem Benutzer: ${m.sender} für weitere ${remainingTime} Minuten - Befehl: ${m.text}`)
                                    m.reply(`❌ Du bist temporär gebannt für weitere ${remainingTime} Minuten und kannst keine Bot-Befehle verwenden.`)
                                    return
                                }
                            }
                        }
                    }
                }
            } catch (banErr) {
                console.error("Fehler bei der frühen Bann-Prüfung (Error in early ban check):", banErr)
            }
            
            try {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') global.db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.guthaben)) user.guthaben = 0 // vorher: saldo
                    if (!isNumber(user.ausgaben)) user.ausgaben = 0 // vorher: pengeluaran
                    if (!isNumber(user.gesundheit)) user.gesundheit = 100 // vorher: healt
                    if (!isNumber(user.health)) user.health = 100
                    if (!isNumber(user.energie)) user.energie = 100 // vorher: energi
                    if (!isNumber(user.power)) user.power = 100
                    if (!isNumber(user.title)) user.title = 0
                    if (!isNumber(user.stamina)) user.stamina = 100
                    if (!isNumber(user.durst)) user.durst = 100 // vorher: haus
                    if (!isNumber(user.hunger)) user.hunger = 100 // vorher: laper
                    if (!isNumber(user.level)) user.level = 0
                    if (!('titlein' in user)) user.titlein = 'Noch nicht vorhanden' // vorher: Belum Ada
                    if (!("ultah" in user)) user.ultah = '' // Geburtstag
                    if (!('partner' in user)) user.partner = '' // vorher: pasangan
                    if (!('freund' in user)) user.freund = '' // vorher: sahabat
                    if (!('standort' in user)) user.standort = 'Hütte' // vorher: location, Gubuk
                    if (!('ehemann' in user)) user.ehemann = 'Noch nicht festgelegt' // vorher: husbu, Belum Di Set
                    if (!('ehefrau' in user)) user.ehefrau = 'Noch nicht festgelegt' // vorher: waifu, Belum Di Set
                    if (!isNumber(user.follow)) user.follow = 0
                    if (!isNumber(user.lastfollow)) user.lastfollow = 0
                    if (!isNumber(user.followers)) user.followers = 0
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.pc)) user.pc = 0
                    if (!isNumber(user.opfer)) user.opfer = 0 // vorher: korbanngocok
                    if (!isNumber(user.motorradfahrerK)) user.motorradfahrerK = 0 // vorher: ojekk
                    if (!isNumber(user.polizei)) user.polizei = 0 // vorher: polisi
                    if (!isNumber(user.motorradfahrer)) user.motorradfahrer = 0 // vorher: ojek
                    if (!isNumber(user.händler)) user.händler = 0 // vorher: pedagang
                    if (!isNumber(user.arzt)) user.arzt = 0 // vorher: dokter
                    if (!isNumber(user.bauer)) user.bauer = 0 // vorher: petani
                    if (!isNumber(user.mechaniker)) user.mechaniker = 0 // vorher: montir
                    if (!isNumber(user.arbeiter)) user.arbeiter = 0 // vorher: kuli
                    if (!isNumber(user.trophäe)) user.trophäe = 0 // vorher: trofi
                    if (!user.rtrofi) user.rtrofi = 'Bronze' // vorher: Perunggu
                    if (!isNumber(user.troopcamp)) user.troopcamp = 0
                    if (!isNumber(user.coin)) user.coin = 0
                    if (!isNumber(user.atm)) user.atm = 0
                    if (!isNumber(user.limit)) user.limit = 10
                    if (!isNumber(user.glimit)) user.glimit = 10
                    if (!isNumber(user.tprem)) user.tprem = 0
                    if (!isNumber(user.tigame)) user.tigame = 5
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (isNumber(user.letztMüllsammeln)) user.letztMüllsammeln = 0 // vorher: lastmulung
                    if (!isNumber(user.judilast)) user.judilast = 0
                    if (!isNumber(user.letztBergbau)) user.letztBergbau = 0 // vorher: lastnambang
                    if (!isNumber(user.letztHolzfällen)) user.letztHolzfällen = 0 // vorher: lastnebang
                    if (!isNumber(user.letztArbeit)) user.letztArbeit = 0 // vorher: lastkerja
                    if (!isNumber(user.letztStehlen)) user.letztStehlen = 0 // vorher: lastmaling
                    if (!isNumber(user.letztTöten)) user.letztTöten = 0 // vorher: lastbunuhi
                    if (!isNumber(user.letztGeschäft)) user.letztGeschäft = 0 // vorher: lastbisnis
                    if (!isNumber(user.letztGeschäftlich)) user.letztGeschäftlich = 0 // vorher: lastberbisnis
                    if (!isNumber(user.geschäftlich)) user.geschäftlich = 0 // vorher: berbisnis
                    if (!isNumber(user.geschäft)) user.geschäft = 0 // vorher: bisnis
                    if (!isNumber(user.letztAngeln)) user.letztAngeln = 0 // vorher: lastmancing
                    if (!isNumber(user.geld)) user.geld = 0 // vorher: money
                    if (!isNumber(user.krankenhaus)) user.krankenhaus = 0 // vorher: rumahsakit
                    if (!isNumber(user.festung)) user.festung = 0 // vorher: fortress
                    if (!isNumber(user.schild)) user.schild = false // vorher: shield
                    if (!isNumber(user.landwirtschaft)) user.landwirtschaft = 0 // vorher: pertanian
                    if (!isNumber(user.bergwerk)) user.bergwerk = 0 // vorher: pertambangan
                    if (!isNumber(user.truppenlager)) user.truppenlager = 0 // vorher: camptroops
                    if (!isNumber(user.mine)) user.mine = 0 // vorher: tambang
                    
                    //Tambahan rpg (RPG additions)
                    if (!isNumber(user.litecoin)) user.litecoin = 0
                    if (!isNumber(user.chip)) user.chip = 0
                    if (!isNumber(user.tiketcoin)) user.tiketcoin = 0
                    if (!isNumber(user.poin)) user.poin = 0
                    if (!isNumber (user.lastbossbattle)) user.lastbossbattle = 0
                    if (!isNumber (user.bank)) user.bank = 0
                    if (!isNumber (user.balance)) user.balance = 0
                    
                    if (!isNumber(user.flasche)) user.flasche = 0 // vorher: botol
                    if (!isNumber(user.karton)) user.karton = 0 // vorher: kardus
                    if (!isNumber(user.dose)) user.dose = 0 // vorher: kaleng
                    if (!isNumber(user.wasser)) user.wasser = 0 // vorher: aqua
                    if (!isNumber(user.diamant)) user.diamant = 0 // vorher: diamond
                    if (!isNumber(user.smaragd)) user.smaragd = 0 // vorher: emerald
                    if (!isNumber(user.holz)) user.holz = 0 // vorher: wood
                    if (!isNumber(user.stein)) user.stein = 0 // vorher: rock
                    if (!isNumber(user.diamant2)) user.diamant2 = 0 // vorher: berlian
                    if (!isNumber(user.eisen)) user.eisen = 0 // vorher: iron
                    if (!isNumber(user.gold)) user.gold = 0 // vorher: emas
                    if (!isNumber(user.arlok)) user.arlok = 0
        
                    if (!isNumber(user.common)) user.common = 0
                    if (!isNumber(user.as)) user.as = 0
                    if (!isNumber(user.uncommon)) user.uncommon = 0
                    if (!isNumber(user.mythic)) user.mythic = 0
                    if (!isNumber(user.legendary)) user.legendary = 0
                    if (!isNumber(user.glory)) user.glory = 0
                    if (!isNumber(user.enchant)) user.enchant = 0
                    if (!isNumber(user.pet)) user.pet = 0
                    if (!isNumber(user.psepick)) user.psepick = 0
                    if (!isNumber(user.psenjata)) user.psenjata = 0
                    //rpg meracik (RPG crafting)
                    if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0
                    if (!isNumber(user.gems)) user.gems = 0
                    if (!isNumber(user.cupon)) user.cupon = 0
                    if (!isNumber(user.lastgemclaim)) user.lastgemclaim = 0
                    if (!isNumber(user.eleksirb)) user.eleksirb = 0
                    if (!isNumber(user.penduduk)) user.penduduk = 0
                    if (!isNumber(user.archer)) user.archer = 0
                    if (!isNumber(user.shadow)) user.shadow = 0
                    if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0
                    if (!isNumber(user.laststringclaim)) user.laststringclaim = 0
                    if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0
                    if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0
                    if (!isNumber(user.lastironclaim)) user.lastironclaim = 0
                    if (!isNumber(user.letztAngelnAnspruch)) user.letztAngelnAnspruch = 0 // vorher: lastmancingclaim
                    if (!isNumber(user.angelkinder)) user.angelkinder = 0 // vorher: anakpancingan
                
                    if (!isNumber(user.trank)) user.trank = 0 // vorher: potion
                    if (!isNumber(user.müll)) user.müll = 0 // vorher: sampah
                    if (!isNumber(user.angel)) user.angel = 0 // vorher: pancing
                    if (!isNumber(user.angeln)) user.angeln = 0 // vorher: pancingan
                    if (!isNumber(user.gesamtAngeln)) user.gesamtAngeln = 0 // vorher: totalPancingan
                    //stamina-booster (Ausdauer-Verstärker)
                    if (!isNumber(user.apfel)) user.apfel = 0 // vorher: apel
                    if (!isNumber(user.brathähnchen)) user.brathähnchen = 0 // vorher: ayamb
                    if (!isNumber(user.grillhähnchen)) user.grillhähnchen = 0 // vorher: ayamg
                    if (!isNumber(user.rindfleisch)) user.rindfleisch = 0 // vorher: sapir
                    if (!isNumber(user.rindfleisch2)) user.rindfleisch2 = 0 // vorher: ssapi
                    if (!isNumber(user.eistee)) user.eistee = 0 // vorher: esteh
                    if (!isNumber(user.grillwels)) user.grillwels = 0 // vorher: leleg
                    if (!isNumber(user.bratwels)) user.bratwels = 0 // vorher: leleb
                    
                    if (!isNumber(user.grillhähnchen2)) user.grillhähnchen2 = 0 // vorher: ayambakar
                    if (!isNumber(user.curry)) user.curry = 0 // vorher: gulai
                    if (!isNumber(user.rindfleischGericht)) user.rindfleischGericht = 0 // vorher: rendang
                    if (!isNumber(user.brathähnchen2)) user.brathähnchen2 = 0 // vorher: ayamgoreng
                    if (!isNumber(user.hühnersuppe)) user.hühnersuppe = 0 // vorher: oporayam
                    if (!isNumber(user.steak)) user.steak = 0
                    if (!isNumber(user.schweinebraten)) user.schweinebraten = 0 // vorher: babipanggang
                    if (!isNumber(user.grillfisch)) user.grillfisch = 0 // vorher: ikanbakar
                    if (!isNumber(user.grilltilapi)) user.grilltilapi = 0 // vorher: nilabakar
                    if (!isNumber(user.grillwels2)) user.grillwels2 = 0 // vorher: lelebakar
                    if (!isNumber(user.grillpomfret)) user.grillpomfret = 0 // vorher: bawalbakar
                    if (!isNumber(user.grillgarnelen)) user.grillgarnelen = 0 // vorher: udangbakar
                    if (!isNumber(user.grillwal)) user.grillwal = 0 // vorher: pausbakar
                    if (!isNumber(user.grillkrabbe)) user.grillkrabbe = 0 // vorher: kepitingbakar
                    if (!isNumber(user.soda)) user.soda = 0
                    if (!isNumber(user.vodka)) user.vodka = 0
                    if (!isNumber(user.ganja)) user.ganja = 0
                    if (!isNumber(user.bandage)) user.bandage = 0
                    if (!isNumber(user.sushi)) user.sushi = 0
                    if (!isNumber(user.roti)) user.roti = 0
                    //untuk masak (Zum Kochen)
                    if (!isNumber(user.coal)) user.coal = 0
                    if (!isNumber(user.korekapi)) user.korekapi = 0
                    //tools (Werkzeuge)
                    if (!isNumber(user.umpan)) user.umpan = 0
                   
                    if (!isNumber(user.armor)) user.armor = 0
                    if (!isNumber(user.armordurability)) user.armordurability = 0
                    if (!isNumber(user.weapon)) user.weapon = 0
                    if (!isNumber(user.weapondurability)) user.weapondurability = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
                    if (!isNumber(user.katana)) user.katana = 0
                    if (!isNumber(user.katanadurability)) user.katanadurability = 0
                    if (!isNumber(user.bow)) user.bow = 0
                    if (!isNumber(user.bowdurability)) user.bowdurability = 0
                    if (!isNumber(user.kapak)) user.kapak = 0
                    if (!isNumber(user.kapakdurability)) user.kapakdurability = 0
                    if (!isNumber(user.axe)) user.axe = 0
                    if (!isNumber(user.axedurability)) user.axedurability = 0
                    if (!isNumber(user.pisau)) user.pisau = 0
                    if (!isNumber(user.pisaudurability)) user.pisaudurability = 0
                    
                    if (!isNumber(user.kerjasatu)) user.kerjasatu = 0
                    if (!isNumber(user.kerjadua)) user.kerjadua = 0
                    if (!isNumber(user.kerjatiga)) user.kerjatiga = 0
                    if (!isNumber(user.kerjaempat)) user.kerjaempat = 0
                    if (!isNumber(user.kerjalima)) user.kerjalima = 0
                    if (!isNumber(user.kerjaenam)) user.kerjaenam = 0
                    if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0
                    if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0
                    if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0
                    if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0
                    if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0
                    if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0
                    if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0
                    if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0
                    if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0
                    
                    if (!isNumber(user.pekerjaansatu)) user.pekerjaansatu = 0
                    if (!isNumber(user.pekerjaandua)) user.pekerjaandua = 0
                    if (!isNumber(user.pekerjaantiga)) user.pekerjaantiga = 0
                    if (!isNumber(user.pekerjaanempat)) user.pekerjaanempat = 0
                    if (!isNumber(user.pekerjaanlima)) user.pekerjaanlima = 0
                    if (!isNumber(user.pekerjaanenam)) user.pekerjaanenam = 0
                    if (!isNumber(user.pekerjaantujuh)) user.pekerjaantujuh = 0
                    if (!isNumber(user.pekerjaandelapan)) user.pekerjaandelapan = 0
                    if (!isNumber(user.pekerjaansembilan)) user.pekerjaansembilan = 0
                    if (!isNumber(user.pekerjaansepuluh)) user.pekerjaansepuluh = 0
                    if (!isNumber(user.pekerjaansebelas)) user.pekerjaansebelas = 0
                    if (!isNumber(user.pekerjaanduabelas)) user.pekerjaanduabelas = 0
                    if (!isNumber(user.pekerjaantigabelas)) user.pekerjaantigabelas = 0
                    if (!isNumber(user.pekerjaanempatbelas)) user.pekerjaanempatbelas = 0
                    if (!isNumber(user.pekerjaanlimabelas)) user.pekerjaanlimabelas = 0
                    
                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                    if (!isNumber(user.kucingexp)) user.kucingexp = 0
                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
                    if (!isNumber(user.rubahexp)) user.rubahexp = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0
                    if (!isNumber(user.anjingexp)) user.anjingexp = 0
                    if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0
                    if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
                    if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
                    if (!isNumber(user.phonixexp)) user.phonixexp = 0
                    if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
                    if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0
                    
                    if (!isNumber(user.makananpet)) user.makananpet = 0
                    if (!isNumber(user.makanannaga)) user.makanannaga = 0
                    if (!isNumber(user.makananphonix)) user.makananphonix = 0
                    if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
                    if (!isNumber(user.makananserigala)) user.makananserigala = 0
                    if (!isNumber(user.makanancentaur)) user.makanancentaur = 0
        
                    if (!'Banneduser' in user) user.Banneduser = false
                    if (!'BannedReason' in user) user.BannedReason = ''
                    if (!isNumber(user.warn)) user.warn = 0
                    if (!('banned' in user)) user.banned = false
                    if (!isNumber(user.bannedTime)) user.bannedTime = 0
        
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!'afkReason' in user) user.afkReason = ''
                
                //PET (Haustiere)
                    if (!isNumber(user.healthmonster)) user.healthmonster = 0
                    if (!isNumber(user.anakkucing)) user.anakkucing = 0
                    if (!isNumber(user.anakkuda)) user.anakkuda = 0
                    if (!isNumber(user.anakrubah)) user.anakrubah = 0
                    if (!isNumber(user.anakanjing)) user.anakanjing = 0
                    if (!isNumber(user.serigala)) user.serigala = 0
                    if (!isNumber(user.serigalaexp)) user.serigalaexp = 0
                    if (!isNumber(user.anakserigala)) user.anakserigala = 0
                    if (!isNumber(user.naga)) user.naga = 0
                    if (!isNumber(user.anaknaga)) user.anaknaga = 0
                    if (!isNumber(user.phonix)) user.phonix = 0
                    if (!isNumber(user.anakphonix)) user.anakphonix = 0
                    if (!isNumber(user.griffin)) user.griffin = 0
                    if (!isNumber(user.anakgriffin)) user.anakgriffin = 0
                    if (!isNumber(user.kyubi)) user.kyubi = 0
                    if (!isNumber(user.anakkyubi)) user.anakkyubi = 0
                    if (!isNumber(user.centaur)) user.centaur = 0
                    if (!isNumber(user.fightnaga)) user.fightnaga = 0
                    if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
                    if (!isNumber(user.makananPet)) user.makananPet = 0
        
                    if (!isNumber(user.antispam)) user.antispam = 0
                    if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
        
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!('kingdom' in user)) user.kingdom = false
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.ramuan)) user.ramuan = 0
                    if (!isNumber(user.string)) user.string = 0
        
                    //angeln (Fischen)
                    if (!isNumber(user.wal)) user.wal = 0 // vorher: paus
             if (!isNumber(user.krabbe)) user.krabbe = 0 // vorher: kepiting
             if (!isNumber(user.oktopus)) user.oktopus = 0 // vorher: gurita
             if (!isNumber(user.tintenfisch)) user.tintenfisch = 0 // vorher: cumi
             if (!isNumber(user.kugelfisch)) user.kugelfisch = 0 // vorher: buntal
             if (!isNumber(user.palettendoktorfisch)) user.palettendoktorfisch = 0 // vorher: dory
             if (!isNumber(user.delfin)) user.delfin = 0 // vorher: lumba
             if (!isNumber(user.hummer)) user.hummer = 0 // vorher: lobster
             if (!isNumber(user.hai)) user.hai = 0 // vorher: hiu
             if (!isNumber(user.garnele)) user.garnele = 0 // vorher: udang
             if (!isNumber(user.fisch)) user.fisch = 0 // vorher: ikan
             if (!isNumber(user.tilapia)) user.tilapia = 0 // vorher: nila
             if (!isNumber(user.pomfret)) user.pomfret = 0 // vorher: bawal
             if (!isNumber(user.wels)) user.wels = 0 // vorher: lele
             if (!isNumber(user.schwertwal)) user.schwertwal = 0 // vorher: orca
                
             if (!isNumber(user.banteng)) user.banteng = 0 // Banteng (keine Übersetzung nötig)
             if (!isNumber(user.tiger)) user.tiger = 0 // vorher: harimau
             if (!isNumber(user.elefant)) user.elefant = 0 // vorher: gajah
             if (!isNumber(user.ziege)) user.ziege = 0 // vorher: kambing
             if (!isNumber(user.panda)) user.panda = 0
             if (!isNumber(user.krokodil)) user.krokodil = 0 // vorher: buaya
             if (!isNumber(user.büffel)) user.büffel = 0 // vorher: kerbau
             if (!isNumber(user.kuh)) user.kuh = 0 // vorher: sapi
             if (!isNumber(user.affe)) user.affe = 0 // vorher: monyet
             if (!isNumber(user.wildschwein)) user.wildschwein = 0 // vorher: babihutan
             if (!isNumber(user.schwein)) user.schwein = 0 // vorher: babi
             if (!isNumber(user.huhn)) user.huhn = 0 // vorher: ayam
         
                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastberburu)) user.lastberburu = 0
                    if (!isNumber(user.lastkill)) user.lastkill = 0
                    if (!isNumber(user.lastfishing)) user.lastfishing = 0
                    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                    if (!isNumber(user.lastwar)) user.lastwar = 0
                    if (!isNumber(user.lastsda)) user.lastsda = 0
                    if (!isNumber(user.lastberbru)) user.lastberbru = 0
                    if (!isNumber(user.lastduel)) user.lastduel = 0
                    if (!isNumber(user.lastjb)) user.lastjb = 0
                    if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0
                    if (!isNumber(user.lastmining)) user.lastmining = 0
                    if (!isNumber(user.lasthunt)) user.lasthunt = 0
                    if (!isNumber(user.lasthun)) user.lasthun = 0
                    if (!isNumber(user.lastngocok)) user.lastngocok = 0
                    if (!isNumber(user.lastgift)) user.lastgift = 0
                    if (!isNumber(user.lastrob)) user.lastrob = 0
                    if (!isNumber(user.lastngojek)) user.lastngojek = 0
                    
                    if (!isNumber(user.lastngewe)) user.lastngewe = 0
                    if (!isNumber(user.ngewe)) user.ngewe = 0
                    if (!isNumber(user.jualan)) user.jualan = 0
                    if (!isNumber(user.lastjualan)) user.lastjualan = 0
                    if (!isNumber(user.ngocokk)) user.ngocokk = 0
                    if (!isNumber(user.lastngocokk)) user.lastngocokk = 0
                    if (!isNumber(user.lastgrab)) user.lastgrab = 0
                    if (!isNumber(user.lastberkebon)) user.lastberkebon = 0
                    if (!isNumber(user.lastcodereg)) user.lastcodereg = 0
                    if (!isNumber(user.lastdagang)) user.lastdagang = 0
                    if (!isNumber(user.lasthourly)) user.lasthourly = 0
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastyearly)) user.lastyearly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
                    if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0
                    if (!isNumber(user.lastturu)) user.lastturu = 0
                    if (!isNumber(user.lastseen)) user.lastseen = 0
                    if (!isNumber(user.lastbansos)) user.lastbansos = 0
                    if (!isNumber(user.lastrampok)) user.lastrampok = 0
                    if (!('registered' in user)) user.registered = false
                    if (!user.registered) {
                    if (!('name' in user)) user.name = this.getName(m.sender)
        
                    if (!isNumber(user.apfel)) user.apfel = 0 // vorher: apel
                    if (!isNumber(user.traube)) user.traube = 0 // vorher: anggur
                    if (!isNumber(user.orange)) user.orange = 0 // vorher: jeruk
                    if (!isNumber(user.wassermelone)) user.wassermelone = 0 // vorher: semangka
                    if (!isNumber(user.mango)) user.mango = 0 // vorher: mangga
                    if (!isNumber(user.erdbeere)) user.erdbeere = 0 // vorher: stroberi
                    if (!isNumber(user.banane)) user.banane = 0 // vorher: pisang
                    if (!isNumber(user.holz)) user.holz = 0 // vorher: kayu
                    if (!isNumber(user.nahrung)) user.nahrung = 0 // vorher: makanan
                    if (!isNumber(user.traubensamen)) user.traubensamen = 0 // vorher: bibitanggur
                    if (!isNumber(user.bananensamen)) user.bananensamen = 0 // vorher: bibitpisang
                    if (!isNumber(user.apfelsamen)) user.apfelsamen = 0 // vorher: bibitapel
                    if (!isNumber(user.mangosamen)) user.mangosamen = 0 // vorher: bibitmangga
                    if (!isNumber(user.orangensamen)) user.orangensamen = 0 // vorher: bibitjeruk
                   
                    //sambung kata (Wort-Verbindung)
                    if (!isNumber(user.skata)) user.skata = 0
        
                      
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.premiumDate)) user.premiumDate = -1
                        if (!isNumber(user.regTime)) user.regTime = -1
                        
        }
                    if (!isNumber(user.level)) user.level = 0
                    if (!user.job) user.job = 'Arbeitslos' // vorher: Pengangguran
                    if (!isNumber(user.jobexp)) user.jobexp = 0
                    if (!('jail' in user)) user.jail = false
                    if (!('gefängnis' in user)) user.gefängnis = false // vorher: penjara
                    if (!('behandelt' in user)) user.behandelt = false // vorher: dirawat
                    if (!isNumber(user.antarpaket)) user.antarpaket = 0
                    if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'
                    if (!user.premium) user.premium = false
                    if (!user.premiumTime) user.premiumTime= 0
                    if (!user.vip) user.vip = 'nein' // vorher: tidak
                    if (!isNumber(user.vipPoin)) user.vipPoin = 0
                    if (!user.role) user.role = 'Neuling ㋡' // vorher: Newbie
                    if (!('autolevelup' in user)) user.autolevelup = false
                    if (!('lastIstigfar' in user)) user.lastIstigfar = true
                  
                    //demon slayer dan rpg baru (Dämonenjäger und neues RPG)
                    if (!("skill" in user)) user.skill = ""
                    if (!("korps" in user)) user.korps = ""
                    if (!("korpsgrade" in user)) user.korpsgrade = ""
                    if (!("breaths" in user)) user.breaths = ""
                    if (!("magic" in user)) user.magic = ""
                    if (!("demon" in user)) user.demon = ""
                    if (!("job" in user)) user.job = "Not Have"  
                    if (!isNumber(user.darahiblis)) user.darahiblis = 0
                    if (!isNumber(user.lastyoutuber)) user.lastyoutuber = 0
                    if (!isNumber(user.subscribers)) user.subscribers = 0
                    if (!isNumber(user.viewers)) user.viewers = 0
                    if (!isNumber(user.like)) user.like = 0
                    if (!isNumber(user.playButton)) user.playButton = 0
                    if (!isNumber(user.demonblood)) user.demonblood = 0
                    if (!isNumber(user.demonkill)) user.demonkill = 0
                    if (!isNumber(user.hashirakill)) user.hashirakill = 0
                    if (!isNumber(user.alldemonkill)) user.alldemonkill = 0
                    if (!isNumber(user.allhashirakill)) user.allhashirakill = 0
                    if (!isNumber(user.attack)) user.attack = 0
                    if (!isNumber(user.strenght)) user.strenght = 0
                    if (!isNumber(user.speed)) user.speed = 0
                    if (!isNumber(user.defense)) user.defense = 0
                    if (!isNumber(user.regeneration)) user.regeneration = 0                    
                    if (!isNumber(user.dana)) user.dana = 0
                    if (!isNumber(user.gopay)) user.gopay = 0
                    if (!isNumber(user.ovo)) user.ovo = 0
                    if (!isNumber(user.lastngaji)) user.lastngaji = 0
                    if (!isNumber(user.lastlonte)) user.lastlonte = 0
                    if (!isNumber(user.lastkoboy)) user.lastkoboy = 0
                    if (!isNumber(user.lastdate)) user.lastdate = 0
                    if (!isNumber(user.lasttambang)) user.lasttambang = 0
                    if (!isNumber(user.lastngepet)) user.lastngepet = 0
                    if (!isNumber(user.lasttaxi)) user.lasttaxi = 0
                    if (!isNumber(user.taxi)) user.taxi = 0
                    if (!isNumber(user.lastjobkerja)) user.lastjobkerja = 0
                    if (!isNumber(user.lastjobchange)) user.lastjobchange = 0  
                } else global.db.data.users[m.sender] = {
                    lastjobkerja: 0,
                    lastjobchange: 0,
                    taxi: 0,
                    lasttaxi: 0,
                    lastyoutuber: 0,
                    subscribers: 0,
                    viewers: 0,
                    like: 0,
                    playButton: 0,
                    saldo: 0,
                    pengeluaran: 0,
                    healt: 100,
                    health: 100,
                    energi: 100,
                    power: 100,
                    title: '',
                    haus: 100,
                    laper: 100,
                    tprem: 0,
                    stamina : 100,
                    level: 0,
                    follow: 0,
                    lastfollow: 0,
                    followers: 0,
                    pasangan: '',
                    sahabat: '', 
                    location: 'Hütte', // vorher: Gubuk
                    titlein: 'Noch nicht vorhanden', // vorher: Belum Ada
                    ultah: '', 
                    waifu: 'Noch nicht festgelegt', // vorher: Belum Di Set
                    husbu: 'Noch nicht festgelegt', // vorher: Belum Di Set
                    pc : 0,
                    exp: 0,
                    coin: 0,
                    atm: 0,
                    limit: 10,
                    skata: 0,
                    tigame: 999,
                    lastclaim: 0,
                    judilast: 0,
                    lastnambang: 0,
                    lastnebang: 0,
                    lastmulung: 0,
                    lastkerja: 0,
                    lastmaling: 0,
                    lastbunuhi: 0,
                    lastbisnis: 0,
                    lastberbisnis: 0,
                    bisnis: 0,
                    berbisnis: 0,
                    lastmancing: 0,
                    pancing: 0,
                    pancingan: 0,
                    totalPancingan: 0,
                    kardus: 0,
                    botol: 0,
                    kaleng: 0,
                    money: 0,
                    litecoin: 0,
                    chip: 0,
                    tiketcoin: 0,
                    poin: 0,
                    bank: 0,
                    balance: 0,
                    diamond: 0,
                    emerald: 0,
                    rock: 0,
                    wood: 0,
                    berlian: 0,
                    iron: 0,
                    emas: 0,
                    common: 0,
                    uncommon: 0,
                    mythic: 0,
                    legendary: 0,
                    rumahsakit: 0,
                    tambang: 0,
                    camptroops: 0,
                    pertanian: 0,
                    fortress: 0,
                    trofi: 0,
                    rtrofi: 'perunggu',
                    makanan: 0,
                    troopcamp: 0,
                    shield: 0,
                    arlok: 0,
                    ojekk: 0,
                    ojek: 0,
                    lastngewe: 0,
                    ngewe: 0,
                    polisi: 0,
                    pedagang: 0,
                    dokter: 0,
                    petani: 0,
                    montir: 0,
                    kuli: 0,
                    korbanngocok: 0,
                    //+ stamina (Ausdauer-Verstärker)
                    coal: 0,
                    korekapi: 0,
                    ayambakar: 0,
                    gulai: 0,
                    rendang: 0,
                    ayamgoreng: 0,
                    oporayam: 0,
                    steak: 0,
                    babipanggang: 0,
                    ikanbakar: 0,
                    lelebakar: 0,
                    nilabakar: 0,
                    bawalbakar: 0,
                    udangbakar: 0,
                    pausbakar: 0,
                    kepitingbakar: 0,
                    soda: 0,
                    vodka: 0,
                    ganja: 0,
                    bandage: 0,
                    sushi: 0,
                    roti: 0,
                    //meracik (Herstellen)
                    ramuan: 0,
                    lastramuanclaim: 0,
                    gems: 0,
                    cupon: 0,
                    lastgemsclaim: 0,
                    eleksirb: 0,
                    penduduk: 0,
                    archer: 0,
                    shadow: 0,
                    laststringclaim: 0,
                    lastpotionclaim: 0,
                    lastswordclaim: 0,
                    lastweaponclaim: 0,
                    lastironclaim: 0,
                    lastmancingclaim: 0,
                    anakpancingan: 0,
                    //mancing (Angeln)
             as: 0,
            paus: 0,
            kepiting: 0,
            gurita: 0,
            cumi: 0,
            buntal: 0,
            dory: 0,
            lumba: 0,
            lobster: 0,
            hiu: 0,
            lele: 0,
            nila: 0,
            bawal: 0,
            udang: 0,
            ikan: 0,
            orca: 0,
            banteng: 0,
            harimau: 0,
            gajah: 0,
            kambing: 0,
            panda: 0,
            buaya: 0,
            kerbau : 0,
            sapi: 0,
            monyet : 0,
            babihutan: 0,
            babi: 0,
            ayam: 0,
            apel: 20,
            ayamb: 0,
            ayamg: 0,
            ssapi: 0,
            sapir: 0,
            leleb: 0,
            leleg: 0,
            esteh: 0,
                    pet: 0,
                    potion: 0,
                    sampah: 0,
                    kucing: 0,
                    kucinglastclaim: 0,
                    kucingexp: 0,
                    kuda: 0,
                    kudalastclaim: 0,
                    rubah: 0,
                    rubahlastclaim: 0,
                    rubahexp: 0,
                    anjing: 0,
                    anjinglastclaim: 0,
                    anjingexp: 0,
                    naga: 0,
                    nagalastclaim: 0,
                    griffin: 0,
                    griffinlastclaim: 0,
                    centaur: 0,
                    fightnaga: 0,
                    centaurlastclaim: 0,
                    serigala: 0,
                    serigalalastclaim: 0,
                    serigalaexp: 0,
                    phonix: 0,
                    phonixlastclaim: 0,
                    phonixexp : 0,
                    makanannaga: 0,
                    makananphonix: 0,
                    makanancentaur: 0,
                    makananserigala: 0,
                    
                    Banneduser: false,
                    BannedReason: '',
                    banned: false, 
                    bannedTime: 0,
                    warn: 0,
                    afk: -1,
                    afkReason: '',
                    anakkucing: 0,
                    anakkuda: 0,
                    anakrubah: 0,
                    anakanjing: 0,
                    makananpet: 0,
                    makananPet: 0,
                    antispam: 0,
                    antispamlastclaim: 0,
                    kayu: 0,
                    batu: 0,
                    string: 0,
                    umpan: 0,
                    armor: 0,
                    armordurability: 0,
                    weapon: 0,
                    weapondurability: 0,
                    sword: 0,
                    sworddurability: 0,
                    pickaxe: 0,
                    pickaxedurability: 0,
                    fishingrod: 0,
                    fishingroddurability: 0,
                    katana: 0,
                    katanadurability: 0,
                    bow: 0,
                    bowdurability: 0,
                    kapak: 0,
                    kapakdurability: 0,
                    axe: 0,
                    axedurability: 0,
                    pisau: 0,
                    pisaudurability: 0,                  
                    kerjasatu: 0,
                    kerjadua: 0,
                    kerjatiga: 0,
                    kerjaempat: 0,
                    kerjalima: 0,
                    kerjaenam: 0,
                    kerjatujuh: 0,
                    kerjadelapan: 0,
                    kerjasembilan: 0,
                    kerjasepuluh: 0,
                    kerjasebelas: 0,
                    kerjaduabelas: 0,
                    kerjatigabelas: 0,
                    kerjaempatbelas: 0,
                    kerjalimabelas: 0,    
                    pekerjaansatu: 0,
                    pekerjaandua: 0,
                    pekerjaantiga: 0,
                    pekerjaanempat: 0,
                    pekerjaanlima: 0,
                    pekerjaanenam: 0,
                    pekerjaantujuh: 0,
                    pekerjaandelapan: 0,
                    pekerjaansembilan: 0,
                    pekerjaansepuluh: 0,
                    pekerjaansebelas: 0,
                    pekerjaanduabelas: 0,
                    pekerjaantigabelas: 0,
                    pekerjaanempatbelas: 0,
                    pekerjaanlimabelas: 0,                    
                    lastadventure: 0,
                    lastwar: 0,
                    lastberkebon: 0,
                    lastberburu: 0,
                    lastbansos: 0,
                    lastrampok: 0,
                    lastkill: 0,
                    lastfishing: 0,
                    lastdungeon: 0,
                    lastduel: 0,
                    lastmining: 0,
                    lasthourly: 0,
                    lastdagang: 0,
                    lasthunt: 0,
                    lasthun : 0,
                    lastweekly: 0,
                    lastmonthly: 0,
                    lastyearly: 0,
                    lastjb: 0,
                    lastrob: 0,
                    lastdaang: 0,
                    lastngojek: 0,
                    lastgrab: 0,
                    lastngocok: 0,
                    lastturu: 0,
                    lastseen: 0,
                    lastSetStatus: 0,
                    registered: false,
                    apel: 20,
                    mangga: 0,
                    stroberi: 0,
                    semangka: 0,
                    jeruk: 0,
                    semangka: 0,
                    name: this.getName(m.sender),
                    age: -1,
                    regTime: -1,
                    premiumDate: -1, 
                    premium: false,
                    premiumTime: 0,
                    vip: 'nein', // vorher: tidak
                    vipPoin: 0,
                    job: 'Arbeitslos', // vorher: Pengangguran
                    jobexp: 0,
                    jail: false, 
                    gefängnis: false, // vorher: penjara
                    antarpaket: 0,
                    behandelt: false, // vorher: dirawat
                    lbars: '[▒▒▒▒▒▒▒▒▒]', 
                    role: 'Neuling ㋡', // vorher: Newbie 
                    registered: false,
                    name: this.getName(m.sender),
                    age: -1,
                    regTime: -1,
                    autolevelup: false,
                    lastIstigfar: 0,
                    
                    skill: "",
                    korps: "",
                    korpsgrade: "",
                    demon: "",
                    breaths: "",
                    magic: "",
                    darahiblis: 0,
                    demonblood: 0,
                    demonkill: 0,
                    hashirakill: 0,
                    alldemonkill: 0,
                    allhashirakill: 0,
                    attack: 0,
                    speed: 0,
                    strenght: 0,
                    defense: 0,
                    regeneration: 0,
                    ovo: 0,
                    dana: 0,
                    gopay: 0,
                    lastngaji: 0,
                    lastlonte: 0,
                    lastkoboy: 0,
                    lastdate: 0,
                    lasttambang: 0,
                    lastngepet: 0,
                }
             let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat)) chat.isBanned = false
                if (!('welcome' in chat)) chat.welcome = true
                if (!isNumber(chat.welcometype)) chat.welcometype = 1
                if (!('detect' in chat)) chat.detect = false
                if (!('isBannedTime' in chat)) chat.isBannedTime = false
                if (!('mute' in chat)) chat.mute = false
                if (!('listStr' in chat)) chat.listStr = {}
                if (!('sWelcome' in chat)) chat.sWelcome = '*Herzlich Willkommen @user!*\n\n     Die Gruppe @subject\n\n╭─────「 *Intro* 」\n│\n│─⪼ Name : \n│─⪼ Alter :\n│─⪼ Wohnort :\n│─⪼ Geschlecht :\n╰─────────────\n\n> Wir wünschen dir eine gute Zeit'
                if (!('sBye' in chat)) chat.sBye = 'Auf Wiedersehen @user'
                if (!('sPromote' in chat)) chat.sPromote = ''
                if (!('sDemote' in chat)) chat.sDemote = ''
                if (!('delete' in chat)) chat.delete = true
                if (!('antiLink' in chat)) chat.antiLink = true
                if (!('antiLinknokick' in chat)) chat.antiLinknokick = false
                if (!('antiSticker' in chat)) chat.antiSticker = false
                if (!('antiStickernokick' in chat)) chat.antiStickernokick = false
                if (!('viewonce' in chat)) chat.viewonce = false
                if (!('antiporn' in chat)) chat.antiporn = false
                if (!('antiToxic' in chat)) chat.antiToxic = false
                if (!isNumber(chat.expired)) chat.expired = 0
                if (!("memgc" in chat)) chat.memgc = {}
                if (!('antilinkig' in chat)) chat.antilinkig = false
                if (!('antilinkignokick' in chat)) chat.antilinkignokick = false
                if (!('antilinkfb' in chat)) chat.antilinkfb = false
                if (!('antilinkfbnokick' in chat)) chat.antilinkfbnokick = false
                if (!('antilinktwit' in chat)) chat.antilinktwit = false
                if (!('antilinktwitnokick' in chat)) chat.antilinktwitnokick = false
                if (!('antilinkyt' in chat)) chat.antilinkyt = false
                if (!('antilinkytnokick' in chat)) chat.antilinkytnokick = false
                if (!('antilinktele' in chat)) chat.antilinktele = false
                if (!('antilinktelenokick' in chat)) chat.antilinktelenokick = false
                if (!('antilinkwame' in chat)) chat.antilinkwame = false
                if (!('antilinkwamenokick' in chat)) chat.antilinkwamenokick = false
                if (!('antilinkall' in chat)) chat.antilinkall = false
                if (!('antilinkallnokick' in chat)) chat.antilinkallnokick = false
                if (!('antilinktt' in chat)) chat.antilinktt = false
                if (!('antilinkttnokick' in chat)) chat.antilinkttnokick = false
                if (!('antibot' in chat)) chat.antibot = false
                if (!('autohd' in chat)) chat.autohd = false // Automatische HD-Umwandlung (automatic HD conversion)
                if (!('autobio' in chat)) chat.autobio = false // Automatische Bio-Aktualisierung (automatic bio update)
                if (!('rpg' in chat)) chat.rpg = false
                if (!('autobackup' in chat)) chat.autobackup = false // Automatische Sicherung (automatic backup)
                if (!('autodl' in chat)) chat.autodl = true // Automatischer Download (automatic download)
                if (!('notifgempa' in chat)) chat.notifgempa = false // Erdbebenbenachrichtigungen (earthquake notifications)
                if (!('notifcuaca' in chat)) chat.notifcuaca = false // Wetterbenachrichtigungen (weather notifications)
                if (!('notifsholat' in chat)) chat.notifsholat = false // Gebetsbenachrichtigungen (prayer notifications)
                if (!('autotranslate' in chat)) chat.autotranslate = false // Automatische Übersetzung (automatic translation)
            } else global.db.data.chats[m.chat] = {
                autotranslate: false,
                notifsholat: false,
                notifgempa: false,
                notifcuaca: false,    
                autodl: true,
                autobackup: false,
                autobio: false,
                autohd: false,
                antiporn: false,
                isBanned: false,
                welcome: false,
                welcometype: 1,
                detect: false,
                isBannedTime: false,
                mute: false,
                listStr: {},
                sWelcome: '*Herzlich Willkommen @user!*\n\n     Die Gruppe @subject\n\n╭─────「 *Intro* 」\n│\n│─⪼ Name : \n│─⪼ Alter :\n│─⪼ Wohnort :\n│─⪼ Geschlecht :\n╰─────────────\n\n> Wir wünschen dir eine gute Zeit',
                sBye: 'Auf Wiedersehen @user',
                sPromote: '',
                sDemote: '',
                delete: false, 
                antiLink: false,
                antiLinknokick: false,
                antiSticker: false, 
                antiStickernokick: false, 
                viewonce: false,
                antiToxic: false,
                antilinkig: false, 
                antilinkignokick: false, 
                antilinkyt: false, 
                antilinkytnokick: false, 
                antilinktwit: false, 
                antilinktwitnokick: false, 
                antilinkfb: false, 
                antilinkfbnokick: false, 
                antilinkall: false, 
                antilinkallnokick: false, 
                antilinkwame: false,
                antilinkwamenokick: false, 
                antilinktele: false, 
                antilinktelenokick: false, 
                antilinktt: false, 
                antilinkttnokick: false, 
                antibot: false, 
                rpg: false, 
            }
            // Initialize memgc objects if they don't exist
            if (!global.db.data.chats[m.chat].memgc) global.db.data.chats[m.chat].memgc = {}
            if (!global.db.data.chats[m.chat].memgc[m.sender]) global.db.data.chats[m.chat].memgc[m.sender] = {}
            
            let memgc = global.db.data.chats[m.chat].memgc[m.sender]
            if (memgc) {
                if (!('blacklist' in memgc)) memgc.blacklist = false
                if (!('banned' in memgc)) memgc.banned = false
                if (!isNumber(memgc.bannedTime)) memgc.bannedTime = 0
                if (!isNumber(memgc.warn)) memgc.warn = 0
                if (!isNumber(memgc.chat)) memgc.chat = 0
                if (!isNumber(memgc.chatTotal)) memgc.chatTotal = 0
                if (!isNumber(memgc.command)) memgc.command = 0
                if (!isNumber(memgc.commandTotal)) memgc.commandTotal = 0
                if (!isNumber(memgc.lastseen)) memgc.lastseen = 0
                
                // Log group member ban status for debugging
                console.log(`Group member initialization check - Group: ${m.chat}, User: ${m.sender}, ` +
                          `Banned: ${memgc.banned}, BannedTime: ${memgc.bannedTime}, Warnings: ${memgc.warn}`)
            } else global.db.data.chats[m.chat].memgc[m.sender] = {
                blacklist: false,
                banned: false,
                bannedTime: 0,
                warn: 0,
                chat: 0,
                chatTotal: 0,
                command: 0,
                commandTotal: 0,
                lastseen: 0
            }
        } catch (e) {
            console.error(e)
        }
            if (opts['nyimak']) return
            if (!m.fromMe && opts['self']) return
            if (opts['pconly'] && m.chat.endsWith('g.us')) return
            if (opts['gconly'] && !m.chat.endsWith('g.us')) return
            if (opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''
            if (opts['queque'] && m.text) {
                this.msgqueque.push(m.id || m.key.id)
                await delay(this.msgqueque.length * 1000)
            }
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!plugin.all) continue
                if (typeof plugin.all !== 'function') continue
                try {
                    await plugin.all.call(this, m, chatUpdate)
                } catch (e) {
                    if (typeof e === 'string') continue
                    console.error(e)
                }
            }
            if (m.id.startsWith('3EB0') || (m.id.startsWith('BAE5') && m.id.length === 16 || m.isBaileys && m.fromMe)) return;
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

            // Define global.owner if it doesn't exist
            if (!global.owner) global.owner = ['628123456789'] // Replace with your number
            
            // Debug log of current owner list (with normalized format)
            console.log("Bot owner list:", global.owner)
            console.log("Sender ID:", m.sender)
            
            // Define global.mods if it doesn't exist
            if (!global.mods) global.mods = []
            
            // Normalize sender ID
            const normalizedSender = m.sender.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            
            // Normalize the bot's user ID
            let botUserJid = global.conn.user.jid || ''
            const normalizedBotUserJid = botUserJid.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            
            // Map owner numbers to normalized WhatsApp JIDs with multiple format handling
            const ownerJIDs = global.owner.map(v => {
                // If it's already a complete JID, just normalize it
                if (v.includes('@')) {
                    return v.replace(/^(\d+)/, (match, num) => `${num}@s.whatsapp.net`)
                }
                
                // Otherwise, convert the number to a JID
                return v.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            })
            
            // Log owner JIDs for debugging
            console.log("Normalized owner JIDs:", ownerJIDs)
            console.log("Normalized sender:", normalizedSender)
            console.log("Normalized bot JID:", normalizedBotUserJid)
            
            // Check if the sender is the Real Owner (bot owner)
            let isROwner = ownerJIDs.some(jid => {
                const matches = jid === normalizedSender
                console.log(`Comparing owner ${jid} with sender ${normalizedSender}: ${matches}`)
                return matches
            })
            
            // Alternative check method for Real Owner
            if (!isROwner) {
                isROwner = ownerJIDs.some(jid => {
                    // Strip down to just the number part for comparison
                    const ownerNum = jid.split('@')[0].replace(/[^0-9]/g, '')
                    const senderNum = normalizedSender.split('@')[0].replace(/[^0-9]/g, '')
                    const matches = ownerNum === senderNum
                    console.log(`Number comparison for owner: ${ownerNum} with sender: ${senderNum}: ${matches}`)
                    return matches
                })
            }
            
            // Check if the sender is the Owner (either Real Owner or the message is from the bot itself)
            let isOwner = isROwner || m.fromMe
            
            console.log("Final owner status - isROwner:", isROwner, "isOwner:", isOwner, "fromMe:", m.fromMe)
            
            // Check if the sender is a Moderator
            let modsJIDs = []
            if (global.mods && Array.isArray(global.mods)) {
                // Normalize moderator JIDs in the same way we handled owner JIDs
                modsJIDs = global.mods.map(v => {
                    if (v.includes('@')) {
                        return v.replace(/^(\d+)/, (match, num) => `${num}@s.whatsapp.net`)
                    }
                    return v.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                })
            }
            
            console.log("Moderator JIDs:", modsJIDs)
            
            // Check if user is mod (primary method)
            let isMods = isOwner // Owners are automatically mods
            
            // Only check further if not already identified as a mod via owner status
            if (!isMods && modsJIDs.length > 0) {
                // Full JID comparison method
                isMods = modsJIDs.some(jid => {
                    const matches = jid === normalizedSender
                    console.log(`Comparing mod ${jid} with sender ${normalizedSender}: ${matches}`)
                    return matches
                })
                
                // If still not a mod, try number-only comparison
                if (!isMods) {
                    isMods = modsJIDs.some(jid => {
                        const modNum = jid.split('@')[0].replace(/[^0-9]/g, '')
                        const senderNum = normalizedSender.split('@')[0].replace(/[^0-9]/g, '')
                        const matches = modNum === senderNum
                        console.log(`Number comparison for mod: ${modNum} with sender: ${senderNum}: ${matches}`)
                        return matches
                    })
                }
            }
            
            console.log("Final moderator status - isMods:", isMods)
            
            // Check if the sender is a Premium user
            let isPrems = isROwner || (db.data.users[m.sender] && (db.data.users[m.sender].premiumTime > 0 || db.data.users[m.sender].premium))
            
            // Get group metadata if the message is in a group
            let groupMetadata = {}
            if (m.isGroup) {
                try {
                    groupMetadata = (conn.chats[m.chat] || {}).metadata || await conn.groupMetadata(m.chat).catch(_ => {
                        console.log("Fehler beim Abrufen von Gruppenmetadaten (Error retrieving group metadata):", _)
                        return {}
                    })
                } catch (err) {
                    console.log("Fehler bei der Verarbeitung von Gruppenmetadaten (Error processing group metadata):", err)
                    groupMetadata = {}
                }
            }
            
            // Get participants if the message is in a group
            let participants = []
            if (m.isGroup && groupMetadata && groupMetadata.participants) {
                participants = groupMetadata.participants
            }
            
            // Get user data if the message is in a group
            let user = {}
            if (m.isGroup && participants.length > 0) {
                // Log all participants for debugging
                console.log("All group participants:", participants.map(p => ({id: p.id, admin: p.admin})))
                
                // Normalize the sender ID format for comparison
                const normalizedSender = m.sender.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                
                user = participants.find(u => {
                    try {
                        // Extract the phone number for comparison
                        const participantPhone = u.id.split('@')[0].replace(/[^0-9]/g, '')
                        const senderPhone = normalizedSender.split('@')[0].replace(/[^0-9]/g, '')
                        const matches = participantPhone === senderPhone
                        console.log(`Comparing: ${participantPhone} with ${senderPhone}, Match: ${matches}`)
                        return matches
                    } catch (err) {
                        console.log("Fehler beim Vergleichen von Benutzer-IDs (Error comparing user IDs):", err)
                        return false
                    }
                }) || {}
            }
            
            // Get bot data if the message is in a group
            let bot = {}
            if (m.isGroup && participants.length > 0) {
                // Normalize the bot's JID for comparison
                const normalizedBotJid = this.user.jid.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                
                bot = participants.find(u => {
                    try {
                        // Extract the phone number for comparison
                        const participantPhone = u.id.split('@')[0].replace(/[^0-9]/g, '')
                        const botPhone = normalizedBotJid.split('@')[0].replace(/[^0-9]/g, '')
                        const matches = participantPhone === botPhone
                        console.log(`Bot comparison: ${participantPhone} with ${botPhone}, Match: ${matches}`)
                        return matches
                    } catch (err) {
                        console.log("Fehler beim Vergleichen von Bot-IDs (Error comparing bot IDs):", err)
                        return false
                    }
                }) || {}
            }
            
            // Check if the user is an admin (primary method)
            let isAdmin = false
            if (user && typeof user === 'object') {
                isAdmin = user.admin === 'admin' || user.admin === 'superadmin' || false
                console.log("User admin status (primary):", user.admin, "isAdmin:", isAdmin)
            }
            
            // Comprehensive admin check using multiple methods
            if (!isAdmin && m.isGroup && participants.length > 0) {
                try {
                    // Get admins with all possible admin values
                    const possibleAdminValues = ['admin', 'superadmin', true]
                    const groupAdmins = participants
                        .filter(p => p.admin !== null && (possibleAdminValues.includes(p.admin)))
                        .map(p => p.id)
                    
                    console.log("Group admins (IDs):", groupAdmins)
                    console.log("All participants:", participants.map(p => ({id: p.id, admin: p.admin})))
                    console.log("Sender to check:", m.sender)
                    
                    // Method 1: Direct comparison with normalization
                    const normalizedSender = m.sender.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                    isAdmin = groupAdmins.some(adminId => {
                        const normalizedAdminId = adminId.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                        const match = normalizedAdminId === normalizedSender
                        console.log(`Admin check (Method 1): ${normalizedAdminId} vs ${normalizedSender} = ${match}`)
                        return match
                    })
                    
                    // Method 2: Phone number only comparison
                    if (!isAdmin) {
                        isAdmin = groupAdmins.some(adminId => {
                            const adminNum = adminId.split('@')[0].replace(/[^0-9]/g, '')
                            const senderNum = normalizedSender.split('@')[0].replace(/[^0-9]/g, '')
                            const match = adminNum === senderNum
                            console.log(`Admin check (Method 2): ${adminNum} vs ${senderNum} = ${match}`)
                            return match
                        })
                    }
                    
                    // Method 3: Try with the participant's raw ID format
                    if (!isAdmin) {
                        // Extract just the participant IDs in their original format
                        const rawGroupAdmins = participants
                            .filter(p => p.admin !== null && (possibleAdminValues.includes(p.admin)))
                            .map(p => p.id)
                        
                        isAdmin = rawGroupAdmins.includes(m.sender)
                        console.log(`Admin check (Method 3): Raw comparison = ${isAdmin}`)
                    }
                    
                    // Method 4: Check if sender has "admin" property directly
                    if (!isAdmin && m.isGroup) {
                        const senderParticipant = participants.find(p => {
                            // Try multiple ID format normalizations
                            const participantId = p.id
                            const participantIdNorm = p.id.replace(/:\d+@/, '@')
                            const senderIdNorm = m.sender.replace(/:\d+@/, '@')
                            
                            // Extract phone numbers for comparison
                            const participantPhone = p.id.split('@')[0].replace(/[^0-9]/g, '')
                            const senderPhone = m.sender.split('@')[0].replace(/[^0-9]/g, '')
                            
                            // Try multiple comparison methods
                            return participantId === m.sender || 
                                   participantIdNorm === senderIdNorm ||
                                   participantPhone === senderPhone
                        })
                        
                        if (senderParticipant) {
                            isAdmin = possibleAdminValues.includes(senderParticipant.admin)
                            console.log(`Admin check (Method 4): Direct participant property check = ${isAdmin}`)
                        }
                    }
                    
                    console.log("Final user admin status:", isAdmin)
                } catch (err) {
                    console.log("Fehler bei der umfassenden Admin-Prüfung (Error during comprehensive admin check):", err)
                    console.error(err)
                }
            }
            
            // Check if the bot is an admin (primary method)
            let isBotAdmin = false
            if (bot && typeof bot === 'object') {
                isBotAdmin = bot.admin === 'admin' || bot.admin === 'superadmin' || false
                console.log("Bot admin status (primary):", bot.admin, "isBotAdmin:", isBotAdmin)
            }
            
            // Comprehensive bot admin check using multiple methods
            if (!isBotAdmin && m.isGroup && participants.length > 0) {
                try {
                    // Get admins with all possible admin values
                    const possibleAdminValues = ['admin', 'superadmin', true]
                    const groupAdmins = participants
                        .filter(p => p.admin !== null && (possibleAdminValues.includes(p.admin)))
                        .map(p => p.id)
                    
                    console.log("Group admins for bot check:", groupAdmins)
                    console.log("Bot JID to check:", this.user.jid)
                    
                    // Method 1: Direct comparison with normalization
                    const normalizedBotJid = this.user.jid.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                    isBotAdmin = groupAdmins.some(adminId => {
                        const normalizedAdminId = adminId.split('@')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                        const match = normalizedAdminId === normalizedBotJid
                        console.log(`Bot admin check (Method 1): ${normalizedAdminId} vs ${normalizedBotJid} = ${match}`)
                        return match
                    })
                    
                    // Method 2: Phone number only comparison
                    if (!isBotAdmin) {
                        isBotAdmin = groupAdmins.some(adminId => {
                            const adminNum = adminId.split('@')[0].replace(/[^0-9]/g, '')
                            const botNum = normalizedBotJid.split('@')[0].replace(/[^0-9]/g, '')
                            const match = adminNum === botNum
                            console.log(`Bot admin check (Method 2): ${adminNum} vs ${botNum} = ${match}`)
                            return match
                        })
                    }
                    
                    // Method 3: Try with the participant's raw ID format
                    if (!isBotAdmin) {
                        // Extract just the participant IDs in their original format
                        const rawGroupAdmins = participants
                            .filter(p => p.admin !== null && (possibleAdminValues.includes(p.admin)))
                            .map(p => p.id)
                        
                        isBotAdmin = rawGroupAdmins.includes(this.user.jid)
                        console.log(`Bot admin check (Method 3): Raw comparison = ${isBotAdmin}`)
                    }
                    
                    // Method 4: Check if bot has "admin" property directly
                    if (!isBotAdmin && m.isGroup) {
                        const botParticipant = participants.find(p => {
                            // Try multiple ID format normalizations
                            const participantId = p.id
                            const participantIdNorm = p.id.replace(/:\d+@/, '@')
                            const botIdNorm = this.user.jid.replace(/:\d+@/, '@')
                            
                            // Extract phone numbers for comparison
                            const participantPhone = p.id.split('@')[0].replace(/[^0-9]/g, '')
                            const botPhone = this.user.jid.split('@')[0].replace(/[^0-9]/g, '')
                            
                            // Try multiple comparison methods
                            return participantId === this.user.jid || 
                                   participantIdNorm === botIdNorm ||
                                   participantPhone === botPhone
                        })
                        
                        if (botParticipant) {
                            isBotAdmin = possibleAdminValues.includes(botParticipant.admin)
                            console.log(`Bot admin check (Method 4): Direct participant property check = ${isBotAdmin}`)
                        }
                    }
                    
                    console.log("Final bot admin status:", isBotAdmin)
                } catch (err) {
                    console.log("Fehler bei der umfassenden Bot-Admin-Prüfung (Error during comprehensive bot admin check):", err)
                    console.error(err)
                }
            }
            
            // Debug log for admin status
            if (m.isGroup) {
                console.log(`Gruppe: ${m.chat}, Benutzer: ${m.sender}, IstAdmin: ${isAdmin}, BotIstAdmin: ${isBotAdmin}`)
            }
            
            // Initialize performance tracking timestamp
            // Using global variable to avoid reference errors in other parts of the code
            global.cmdProcessingStart = Date.now();
            
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                }
                
                // Command matching with cache for performance optimization
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
                
                // Try to get from cache first
                const cacheKey = `${name}|${typeof _prefix === 'string' ? _prefix : 'regex'}|${m.text}`;
                let match;
                
                if (commandCache.has(cacheKey)) {
                    // Use cached result - much faster for repeated commands
                    match = commandCache.get(cacheKey);
                } else {
                    // Compute matching regex
                    match = (_prefix instanceof RegExp ? // RegExp Mode?
                        [[_prefix.exec(m.text), _prefix]] :
                        Array.isArray(_prefix) ? // Array?
                            _prefix.map(p => {
                                // Cache regex compilations for better performance
                                const prefixKey = p instanceof RegExp ? p.toString() : p;
                                let re;
                                
                                if (prefixRegexCache.has(prefixKey)) {
                                    re = prefixRegexCache.get(prefixKey);
                                } else {
                                    re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
                                    prefixRegexCache.set(prefixKey, re);
                                }
                                
                                return [re.exec(m.text), re];
                            }) :
                            typeof _prefix === 'string' ? // String?
                                // Cache common string prefix regex
                                (() => {
                                    const prefixKey = _prefix;
                                    let re;
                                    
                                    if (prefixRegexCache.has(prefixKey)) {
                                        re = prefixRegexCache.get(prefixKey);
                                    } else {
                                        re = new RegExp(str2Regex(_prefix));
                                        prefixRegexCache.set(prefixKey, re);
                                    }
                                    
                                    return [[re.exec(m.text), re]];
                                })() :
                                [[[], new RegExp]]
                    ).find(p => p[1]);
                    
                    // Cache the result for future uses
                    if (commandCache.size >= COMMAND_CACHE_MAX) {
                        // Remove oldest entry if cache is full
                        const oldestKey = commandCache.keys().next().value;
                        commandCache.delete(oldestKey);
                    }
                    commandCache.set(cacheKey, match);
                }
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || global.dfail // When failed
                    
                    // Fast command matching with cache
                    const cmdCacheKey = `${name}|${command}`;
                    let isAccept;
                    
                    if (commandCache.has(cmdCacheKey)) {
                        // Use cached result for command matching
                        isAccept = commandCache.get(cmdCacheKey);
                    } else {
                        // Calculate command match
                        isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                            plugin.command.test(command) :
                            Array.isArray(plugin.command) ? // Array?
                                plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                                    cmd.test(command) :
                                    cmd === command
                                ) :
                                typeof plugin.command === 'string' ? // String?
                                    plugin.command === command :
                                    false;
                        
                        // Cache the result
                        commandCache.set(cmdCacheKey, isAccept);
                    }

                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                        let chat = global.db.data.chats[m.chat]
                        let user = global.db.data.users[m.sender]
                        if (name != 'group-modebot.js' && name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && (chat?.isBanned || chat?.mute))
                        return
                        if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
                        // Enhanced ban detection with detailed logging
                        if (name != 'unbanuser.js') {
                            // First check if user exists
                            if (!user) {
                                console.log(`User data not found for ${m.sender} when checking ban status`)
                                // Initialize user if needed
                                global.db.data.users[m.sender] = {
                                    banned: false,
                                    bannedTime: 0,
                                    warn: 0
                                }
                                user = global.db.data.users[m.sender]
                            }
                            
                            // Debug logging for user ban status
                            console.log(`Ban check - User: ${m.sender}, Banned: ${user.banned}, BannedTime: ${user.bannedTime}, Warnings: ${user.warn || 0}`)
                            
                            // Check if user is banned
                            if (user.banned === true) {
                                console.log(`Command blocked - User ${m.sender} is banned`)
                                // Optionally notify user they are banned
                                m.reply(`Du bist gebannt und kannst keine Befehle verwenden. Wende dich an einen Administrator, um entbannt zu werden.`) // Translated ban message
                                return
                            }
                            
                            // Check for temporary ban
                            if (user.bannedTime && user.bannedTime > Date.now()) {
                                const remainingTime = Math.ceil((user.bannedTime - Date.now()) / 1000 / 60) // minutes
                                console.log(`Command blocked - User ${m.sender} is temporarily banned for ${remainingTime} more minutes`)
                                m.reply(`Du bist temporär gebannt für weitere ${remainingTime} Minuten.`) // Translated temporary ban message
                                return
                            }
                            
                            // Check if user has warnings that should restrict commands
                            let maxWarnings = parseInt(global.maxwarn || 3);
                            if (user.warn && user.warn >= maxWarnings) {
                                console.log(`Command blocked - User ${m.sender} has too many warnings: ${user.warn}/${maxWarnings}`)
                                m.reply(`Du hast zu viele Verwarnungen (${user.warn}/${maxWarnings}). Einige Befehle sind eingeschränkt.`) // Translated warning message
                                // Could return here or continue based on your warning policy
                            }
                        }
                        if (m.isGroup) {
                            // Make sure chat.memgc and chat.memgc[m.sender] exist
                            if (!chat.memgc) chat.memgc = {}
                            if (!chat.memgc[m.sender]) chat.memgc[m.sender] = {
                                command: 0,
                                commandTotal: 0,
                                lastCmd: 0,
                                banned: false,
                                bannedTime: 0,
                                warn: 0
                            }
                            
                            // Check if user is banned in this specific group
                            console.log(`Group member ban check - Group: ${m.chat}, User: ${m.sender}, ` +
                                      `Banned in group: ${chat.memgc[m.sender].banned}, ` +
                                      `Warnings: ${chat.memgc[m.sender].warn || 0}`)
                            
                            // Check for permanent group ban
                            if (chat.memgc[m.sender].banned === true) {
                                console.log(`Command blocked - User ${m.sender} is banned in group ${m.chat}`)
                                m.reply(`Du bist in dieser Gruppe gebannt und kannst keine Befehle verwenden.`) // Translated group ban message
                                return
                            }
                            
                            // Check for temporary group ban
                            if (chat.memgc[m.sender].bannedTime && chat.memgc[m.sender].bannedTime > Date.now()) {
                                const remainingTime = Math.ceil((chat.memgc[m.sender].bannedTime - Date.now()) / 1000 / 60) // minutes
                                console.log(`Command blocked - User ${m.sender} is temporarily banned in group ${m.chat} for ${remainingTime} more minutes`)
                                m.reply(`Du bist in dieser Gruppe temporär gebannt für weitere ${remainingTime} Minuten.`) // Translated temporary group ban message
                                return
                            }
                            
                            // Check group warnings
                            let maxGroupWarnings = parseInt(global.maxwarn || 3);
                            if (chat.memgc[m.sender].warn && chat.memgc[m.sender].warn >= maxGroupWarnings) {
                                console.log(`Warning restriction - User ${m.sender} has ${chat.memgc[m.sender].warn}/${maxGroupWarnings} warnings in group ${m.chat}`)
                                m.reply(`Du hast zu viele Verwarnungen (${chat.memgc[m.sender].warn}/${maxGroupWarnings}). Einige Befehle sind eingeschränkt.`) // Translated group warning message
                                // Could return here to prevent command execution
                            }
                            
                            // Update usage stats
                            chat.memgc[m.sender].command++
                            chat.memgc[m.sender].commandTotal++
                            chat.memgc[m.sender].lastCmd = Date.now()
                        }
                        user.command++
                        user.commandTotal++
                        user.lastCmd = Date.now()
                    }
                    if (plugin.rpg && !global.db.data.chats[m.chat].rpg) { // rpg
                        fail('rpg', m, this) 
                        continue
                    }
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    if (plugin.owner && !isOwner) { // Number Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.mods && !isMods) { // Moderator
                        fail('mods', m, this)
                        continue
                    }
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !isAdmin) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    if (plugin.register == true && _user.registered == false) { // Bist du Registriert?
                        fail('unreg', m, this)
                        continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 200) m.reply('Schummler -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.reply(m.chat, `Dein Limit ist aufgebraucht, bitte kaufe mehr über *${usedPrefix}buy* oder im *${usedPrefix}shop*`, m) // Translated limit message
                        continue // Limit erschöpft
                    }
                    if (plugin.level > _user.level) {
                        this.reply(m.chat, `Level ${plugin.level} wird benötigt, um diesen Befehl zu verwenden. Dein Level ist ${_user.level}\nVerwende .levelup, um dein Level zu erhöhen!`, m) // Translated level requirement message
                        continue // Wenn das erforderliche Level nicht erreicht wurde (When the required level is not reached)
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                    }                          
                    try {
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            if (e.name)
                            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != this.user.jid)) {
                                let data = (await this.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    m.reply(`*Plugin:* ${m.plugin}\n*Sender:* @${m.sender.split`@`[0]}\n*Chat:* ${m.chat}\n*Chat Name:* ${await this.getName(m.chat)}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid, { mentions: [m.sender] })
                            }
                            m.reply(text)
                        }
                    } finally {
                        // m.reply(util.format(_user))
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        if (m.limit) m.reply(+ m.limit + ' Limit verwendet')
                   }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            // Calculate command processing time for performance monitoring
            if (m.isCommand && global.cmdProcessingStart) {
                const processingTime = Date.now() - global.cmdProcessingStart;
                
                // Log performance data for slow commands (over 100ms)
                if (processingTime > 100) {
                    console.log(`Command processing performance: ${m.text?.split(' ')[0] || 'command'} took ${processingTime}ms to process`);
                    
                    // Track slow commands for optimization
                    if (!global.slowCommands) global.slowCommands = {};
                    const cmdName = m.text?.split(' ')[0] || 'unknown';
                    if (!global.slowCommands[cmdName]) {
                        global.slowCommands[cmdName] = {
                            count: 0,
                            totalTime: 0,
                            avgTime: 0
                        };
                    }
                    
                    global.slowCommands[cmdName].count++;
                    global.slowCommands[cmdName].totalTime += processingTime;
                    global.slowCommands[cmdName].avgTime = global.slowCommands[cmdName].totalTime / global.slowCommands[cmdName].count;
                }
            }
            
            //conn.sendPresenceUpdate('composing', m.chat) // kalo pengen auto vn hapus // di baris dekat conn
            //console.log(global.db.data.users[m.sender])
            let user, stats = global.db.data.stats
            if (m) {
                if (m.sender && (user = global.db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                }

                let stat
                if (m.plugin) {
                    let now = + new Date
                    if (m.plugin in stats) {
                        stat = stats[m.plugin]
                        if (!isNumber(stat.total)) stat.total = 1
                        if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                        if (!isNumber(stat.last)) stat.last = now
                        if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                    } else stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                    stat.total += 1
                    stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }

            try {
                 require('./lib/print')(m, this)
             } catch (e) {
                 console.log(m, m.quoted, e)
             }
            if (opts['autoread']) await this.readMessages([m.key])
                let chat = global.db.data.chats[m.chat]

        // Update user chat stats safely
        if (user) {
            if (!user.chat) user.chat = 0
            if (!user.chatTotal) user.chatTotal = 0
            user.chat++
            user.chatTotal++
            user.lastseen = Date.now()
        }

        // Update group chat stats safely
        if (m.isGroup && chat) {
            // Ensure chat.memgc exists
            if (!chat.memgc) chat.memgc = {}
            // Ensure chat.memgc[m.sender] exists
            if (!chat.memgc[m.sender]) {
                chat.memgc[m.sender] = {
                    chat: 0,
                    chatTotal: 0,
                    lastseen: 0
                }
            }
            
            chat.memgc[m.sender].chat++
            chat.memgc[m.sender].chatTotal++
            chat.memgc[m.sender].lastseen = Date.now()
        }
        }
    },
   // Verarbeitung von Teilnehmeraktualisierungen (Processing participant updates - join/leave events)
   async participantsUpdate({ id, participants, action }) {
        if (opts['self']) return
        // if (id in conn.chats) return // First login will spam
        if (global.isInit) return
        let chat = db.data.chats[id] || {}
        let text = ''
        switch (action) {
        // Handling welcome (add) and goodbye (remove/leave) actions (Willkommens- und Abschiedsaktionen verarbeiten)
        case 'add':
        case 'remove':
                case 'leave':
                case 'invite':
                case 'invite_v4':
                if (chat.welcome) {
                    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                    for (let user of participants) {
                        let pp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mFzSckd12spppS8gAJ2KB2ER-ccZd4pBbw&usqp=CAU'
                        let ppgroup = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mFzSckd12spppS8gAJ2KB2ER-ccZd4pBbw&usqp=CAU'
                        try {
                             pp = await this.profilePictureUrl(user, 'image')
                             ppgroup = await this.profilePictureUrl(id, 'image')
                        } catch (e) {
                             console.log('Error getting profile picture:', e)
                        } finally {
                            // Get text template (Hole Textvorlage)
                            text = (action === 'add' ? 
                                (chat.sWelcome || this.welcome || conn.welcome || 'Willkommen, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc ? groupMetadata.desc.toString() : '') : // Welcome message template (Willkommensnachrichtenvorlage)
                                (chat.sBye || this.bye || conn.bye || 'Auf Wiedersehen, @user!')).replace('@user', '@' + user.split('@')[0]) // Goodbye message template (Abschiedsnachrichtenvorlage)
                            
                            // Format the message as a card with the user's profile picture
                            const userName = '@' + user.split('@')[0]
                            const groupName = await this.getName(id)
                            const memberCount = groupMetadata.participants.length
                            
                            // Create a formatted message with the profile picture (Erstelle eine formatierte Nachricht mit dem Profilbild)
                            if (action === 'add') {
                                // Welcome message (Willkommensnachricht)
                                await this.sendMessage(id, {
                                    text: text,
                                    contextInfo: {
                                        mentionedJid: [user],
                                        externalAdReply: {
                                            title: '👋 WILLKOMMEN', // Welcome
                                            body: `In der Gruppe: ${groupName}`, // In the group
                                            mediaType: 1,
                                            thumbnailUrl: pp,
                                            sourceUrl: '',
                                            renderLargerThumbnail: true
                                        }
                                    }
                                })
                            } else {
                                // Goodbye message (Abschiedsnachricht)
                                await this.sendMessage(id, {
                                    text: text,
                                    contextInfo: {
                                        mentionedJid: [user],
                                        externalAdReply: {
                                            title: '👋 AUF WIEDERSEHEN', // Goodbye
                                            body: `Aus der Gruppe: ${groupName}`, // From the group
                                            mediaType: 1,
                                            thumbnailUrl: pp,
                                            sourceUrl: '',
                                            renderLargerThumbnail: true
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
                break                        
            case 'promote':
                // When someone is promoted to admin (Wenn jemand zum Administrator befördert wird)
                try {
                    text = (chat.sPromote || this.spromote || conn.spromote || '@user ```ist jetzt Administrator```') // Admin promotion message template
                    console.log(`Benutzer ${participants[0]} wurde zum Administrator in Gruppe ${id} befördert`) // User was promoted to admin in group
                } catch (err) {
                    console.log("Fehler im Beförderungs-Handler (Error in promotion handler):", err)
                }
                break
            case 'demote':
                // When someone is demoted from admin (Wenn jemand vom Administrator herabgestuft wird)
                try {
                    text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```ist nicht mehr Administrator```') // Admin demotion message template
                    console.log(`Benutzer ${participants[0]} wurde vom Administrator in Gruppe ${id} herabgestuft`) // User was demoted from admin in group
                } catch (err) {
                    console.log("Fehler im Herabstufungs-Handler (Error in demotion handler):", err)
                }
                break
            default:
                break
        }
        
        // Process admin status change notifications if text is set (Verarbeite Benachrichtigungen zur Änderung des Administrator-Status, wenn Text gesetzt ist)
        if (text && participants.length > 0) {
            try {
                // Log all participant details for debugging (Protokolliere alle Teilnehmerdetails für die Fehlerbehebung)
                console.log("Action:", action) // Aktion (Action)
                console.log("Participants in action:", participants) // Teilnehmer in Aktion (Participants in action)
                
                // Normalize participant ID for better compatibility (Normalisiere Teilnehmer-ID für bessere Kompatibilität)
                const normalizedParticipantId = participants[0].replace(/^(\d+)/, (match, num) => `${num}@s.whatsapp.net`)
                console.log("Normalized participant ID:", normalizedParticipantId) // Normalisierte Teilnehmer-ID (Normalized participant ID)
                
                text = text.replace('@user', '@' + normalizedParticipantId.split('@')[0])
                
                if (chat.detect) {
                    // Send message with improved mention handling (Sende Nachricht mit verbesserter Erwähnungsbehandlung)
                    this.sendMessage(id, {
                        text: text,
                        mentions: [normalizedParticipantId]
                    })
                    
                    console.log("Admin status notification sent successfully") // Benachrichtigung über Administratorstatus erfolgreich gesendet (Admin status notification sent successfully)
                }
            } catch (err) {
                console.log("Fehler beim Senden der Benachrichtigung zur Statusänderung des Administrators (Error sending admin status change notification):", err)
                console.error(err)
            }
        }
    },
    // Handler für gelöschte Nachrichten (Handler for deleted messages)
    async delete({ remoteJid, fromMe, id, participant }) {
        if (fromMe) return
        let chats = Object.entries(conn.chats).find(([user, data]) => data.messages && data.messages[id])
        if (!chats) return
        let msg = JSON.parse(chats[1].messages[id])
        let chat = global.db.data.chats[msg.key.remoteJid] || {}
        if (chat.delete) return
        await this.reply(msg.key.remoteJid, `
Erkannt: @${participant.split`@`[0]} hat eine Nachricht gelöscht (Detected: user deleted a message)
Um diese Funktion zu deaktivieren, tippe (To disable this function, type)
*.enable delete*
`.trim(), msg, { // Detection message for deleted messages
            mentions: [participant]
        })
        this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
    },
    
    // Handle connection updates - including successful connection (Verarbeitung von Verbindungsaktualisierungen - einschließlich erfolgreicher Verbindung)
    async connectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update
        
        // Protokolliere Verbindungsstatusänderungen (Log connection status changes)
        if (connection) {
            console.log('Verbindungsstatus:', connection) // Connection status
        }
        
        // Wenn erfolgreich verbunden, sende eine Startnachricht (When successfully connected, send a startup message)
        if (connection === 'open') {
            console.log('\x1b[32m%s\x1b[0m', '✅ VERBUNDEN! Bot ist jetzt online und bereit.') // CONNECTED! Bot is now online and ready
            
            // Sende Startnachricht nach kurzer Verzögerung, um sicherzustellen, dass die Verbindung stabil ist (Send startup message after a short delay to ensure the connection is stable)
            setTimeout(async () => {
                try {
                    if (!this.user) {
                        console.log('\x1b[33m%s\x1b[0m', '⚠️ Kann Startnachricht nicht senden: Bot-Benutzerinformationen noch nicht verfügbar (Cannot send startup message: Bot user information not yet available)')
                        return
                    }
                    
                    // Bot's eigene JID (Bot's own JID - WhatsApp identifier)
                    const botNumber = this.user.jid
                    console.log('\x1b[36m%s\x1b[0m', `📱 Bot-Nummer: ${botNumber}`) // Bot number
                    
                    // Aktuelles Datum und Uhrzeit (Current date and time)
                    const now = new Date().toLocaleString()
                    
                    // Systeminformationen abrufen (Retrieve system information)
                    const os = require('os')
                    const systemInfo = {
                        platform: os.type(),
                        version: os.release(),
                        arch: os.arch(),
                        totalRAM: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
                        freeRAM: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
                        uptime: formatUptime(os.uptime()),
                        nodeVersion: process.version
                    }
                    
                    // Formatiere die Startnachricht (Format the startup message)
                    const startupMessage = `
┌─⊷ *BOT-STARTBENACHRICHTIGUNG* ⊶
│
│ 🤖 *WhatsApp Bot ist jetzt ONLINE!*
│ ⏰ ${now}
│
│ 💻 *Systeminformationen:*
│ • Plattform: ${systemInfo.platform}
│ • BS-Version: ${systemInfo.version}
│ • Architektur: ${systemInfo.arch}
│ • Node.js: ${systemInfo.nodeVersion}
│
│ 🖥️ *Ressourcen:*
│ • Gesamter RAM: ${systemInfo.totalRAM}
│ • Freier RAM: ${systemInfo.freeRAM}
│ • System-Laufzeit: ${systemInfo.uptime}
│
│ 📲 *Bot-Nummer:* ${botNumber.split('@')[0]}
│
└───────────────────────
`.trim()
                    
                    // Sende die Nachricht an die Bot-eigene Nummer (Send the message to the bot's own number)
                    console.log('\x1b[33m%s\x1b[0m', '🟡 Sende Startnachricht an Bot...') // Sending startup message to bot
                    await this.sendMessage(botNumber, { text: startupMessage })
                    console.log('\x1b[32m%s\x1b[0m', '✅ Startnachricht erfolgreich gesendet!') // Startup message successfully sent
                } catch (err) {
                    console.error('\x1b[31m%s\x1b[0m', `❌ Fehler beim Senden der Startnachricht (Error sending startup message): ${err}`)
                }
            }, 5000) // Warte 5 Sekunden vor dem Senden (Wait 5 seconds before sending)
        }
        
        // Verarbeite Verbindungsabbrüche (Handle connection disconnects)
        if (connection === 'close') {
            let reason = lastDisconnect?.error?.output?.statusCode
            if (reason === 401) {
                console.log('\x1b[31m%s\x1b[0m', '❌ Sitzung abgemeldet, bitte lösche die Sitzungen und scanne erneut. (Session logged out, please delete sessions and scan again)')
            } else if (reason === 408) {
                console.log('\x1b[33m%s\x1b[0m', '⚠️ Zeitüberschreitung der Verbindung, verbinde neu... (Connection timeout, reconnecting)')
            } else {
                console.log('\x1b[33m%s\x1b[0m', '⚠️ Verbindung geschlossen, versuche neu zu verbinden... (Connection closed, trying to reconnect)')
            }
        }
    }
}

// Hilfsfunktion zur Formatierung der Laufzeit (Helper function for formatting uptime)
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    return `${days}d ${hours}h ${minutes}m ${secs}s`
}

// Global command failure handler with translated messages
global.dfail = (type, m, conn) => {
    let msg = {
        rowner: 'Dieser Befehl kann nur vom _*HAUPTBESITZER!1!1!*_ verwendet werden', // This command can only be used by the MAIN OWNER!
        owner: 'Dieser Befehl kann nur vom _*Bot-Besitzer*_ verwendet werden!', // This command can only be used by the bot owner!
        mods: 'Dieser Befehl kann nur von _*Moderatoren*_ verwendet werden!', // This command can only be used by moderators!
        premium: 'Dieser Befehl ist nur für _*Premium-Mitglieder*_ verfügbar!', // This command is only available for premium members!
        rpg: 'Die RPG-Funktion wurde vom Administrator deaktiviert\n\n> Gib *.enable rpg* ein, um auf RPG-Funktionen zuzugreifen', // RPG function has been disabled by admin. Type *.enable rpg* to access RPG functions
        group: 'Dieser Befehl kann nur in Gruppen verwendet werden!', // This command can only be used in groups!
        private: 'Dieser Befehl kann nur im privaten Chat verwendet werden!', // This command can only be used in private chat!
        admin: 'Dieser Befehl ist nur für *Gruppen-Administratoren* verfügbar!', // This command is only available for group administrators!
        botAdmin: 'Der Bot muss *Administrator* sein, um diesen Befehl zu verwenden!', // The bot must be an administrator to use this command!
        unreg: 'Bitte registriere dich, um diese Funktion zu nutzen, indem du folgendes eingibst:\n\n*.register Name.Alter*\n\nBeispiel: *#register max.16*', // Please register to use this function by entering: *.register Name.Age*
        restrict: 'Diese Funktion ist *deaktiviert*!' // This function is disabled!
    }[type]
    if (msg) return m.reply(msg)
}

// File system modules and hot reload handling
let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Aktualisierung von 'handler.js'")) // Update of handler.js
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})

