let handler = m => m

handler.before = async function (m) {
  this.ev.on('call', async (call) => {
      if (call[0].Status == 'offer') {
        await this.rejectCall(call[0].id, call[0].from);
        await this.updateBlockStatus(call[0].from, "block");
      }
  });
}

module.exports = handler

//Admin bitte entschuldigung oben kesalahan kode bevor sein/ihr