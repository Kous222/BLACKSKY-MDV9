let handler = async (m, { conn }) => {
  // Checking if the bot was added to the group
  if (m.isGroup) {
    let groupMeta = await conn.groupMetadata(m.chat)
    let groupOwner = groupMeta.owner
    let groupName = groupMeta.subject

    // Send a welcome message when the bot joins a new group
    await conn.sendMessage(m.chat, `Hallo! Ich bin jetzt in der Gruppe *${groupName}* 😊`, { 
      mentions: [groupOwner],
    })

    // Add the owner of the group to the group
    try {
      await conn.addParticipant(m.chat, groupOwner)
      console.log(`Successfully added group owner @${groupOwner.split('@')[0]} to the group.`)
    } catch (error) {
      console.error("Error adding group owner to the group: ", error)
      await conn.sendMessage(m.chat, `Konnte den Gruppeninhaber nicht automatisch hinzufügen.`, { mentions: [groupOwner] })
    }
  }
}

handler.help = ['join']
handler.tags = ['group']
handler.command = /^join$/i

module.exports = handler
