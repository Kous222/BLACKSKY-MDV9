let handler = async (m, { conn, usedPrefix, text, command }) => {
    let user = global.db.data.users[m.sender]
    let Fähigkeit = {
        "barbarian": { difficulty: "hard", stars: "⭐⭐⭐⭐" },
        "bard": { difficulty: "medium", stars: "⭐⭐⭐" },
        "cleric": { difficulty: "medium", stars: "⭐⭐⭐" },
        "druid": { difficulty: "hard", stars: "⭐⭐⭐⭐" },
        "fighter": { difficulty: "easy", stars: "⭐⭐" },
        "monk": { difficulty: "expert", stars: "⭐⭐⭐⭐⭐" },
        "paladin": { difficulty: "hard", stars: "⭐⭐⭐⭐" },
        "ranger": { difficulty: "medium", stars: "⭐⭐⭐" },
        "rogue": { difficulty: "medium", stars: "⭐⭐⭐" },
        "sorcerer": { difficulty: "expert", stars: "⭐⭐⭐⭐⭐" },
        "warlock": { difficulty: "hard", stars: "⭐⭐⭐⭐" },
        "wizard": { difficulty: "expert", stars: "⭐⭐⭐⭐⭐" }
    }

    let skil = text.trim().toLowerCase() // filter text

    if (!Object.keys(Fähigkeit).includes(skil)) {
        // Generate the list of skills with their difficulty and star rating
        let skillList = Object.keys(Fähigkeit).map(s => {
            let { difficulty, stars } = Fähigkeit[s]
            return `- *${s}* *[ ${stars} ]*\n_Difficulty_ : ${difficulty}`
        }).join('\n')

        // Context info for available skills with externalAdReply
        const availableSkillsMessage = `乂 *C L A S S*\n\nPilih *Class* die/der/das Sie sukai oder sesuai mit Fähigkeit oder talent mu :\n\n${skillList}\n\n_How To Use_ :\n${usedPrefix + command} *nameskill*\n\n_Example_ :\n${usedPrefix + command} *wizard*`.trim();
        await conn.reply(m.chat, availableSkillsMessage, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'AXELLDX',
                    thumbnailUrl: 'https://telegra.ph/file/a0e0fd6b16e109e36e455.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
        return;
    }

    // Initialize user skills if not present
    if (!user.skills) {
        user.skills = []
    }

    let { difficulty, stars } = Fähigkeit[skil]

    // Remove previous Fähigkeit
    if (user.Fähigkeit) {
        let index = user.skills.findIndex(s => s.name === user.Fähigkeit)
        user.skills.splice(index, 1)
    }

    let newSkill = {
        name: skil,
        difficulty: difficulty,
        stars: stars
    }

    user.skills.push(newSkill)
    user.Fähigkeit = skil // Update current Fähigkeit
    m.reply(`Sie hat memilih Fähigkeit ${skil} mit Schwierigkeitsgrad ${difficulty} und bintang ${stars}.`)
}

handler.help = ['selectskill <type>']
handler.tags = ['rpg']
handler.command = /^(selectskill)$/i
handler.register = true
handler.group = true
handler.rpg = true
module.exports = handler