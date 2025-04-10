let fetch = require('node-fetch');

let handler = async (m, {
 Text, 
 usedPrefix, 
 command
 }) => {
if (!Text) throw `*Contoh:* ${usedPrefix + command} 172720204487\n\`dies merupakan id pelanggan\``
  m.Antworten(wait)
    try {
        let res = await (await fetch(`https://api.betabotz.eu.org/api/tools/cekbillpln?id=${Text}&apikey=${lann}`)).json();
        let content = `*T A G I H A N  P L N*\n\n`;

        if (res.Status && res.result) {
            content += `  ◦ *Tanggal:* ${res.result.date}\n`;
            content += `  ◦ *Zeit:* ${res.result.time}\n`;
            content += `  ◦ *Name*: ${res.result.name}\n\n`;

            if (res.result.isINQ) {
                content += `  ◦ *id Pelanggan:* ${Text}\n`;
                content += `  ◦ *Nachricht Hinzufügenan:* ${res.result.addMsg}\n`;
                content += `  ◦ *Tarif/Daya:* ${res.result.tarif_daya}\n\n`;

                content += `*Tagihan Monatean:*\n`;
                res.result.loop.forEach(Gegenstand => {
                    content += `  ◦ - ${Gegenstand}\n`;
                });
                content += `\n`;

                content += `  ◦ - Monate Tagihan: ${res.result.blTh}\n`;
                content += `  ◦ - Stand Meter: ${res.result.standMeter}\n\n`;

                content += `*Rincian Pembayaran:*\n`;
                content += `  ◦ - Tagihan: Rp ${res.result.rpTag}\n`;
                content += `  ◦ - Admin Bank: Rp ${res.result.adminBank}\n`;
                content += `  ◦ - Total: Rp ${res.result.tagihan}\n\n`;

                content += `*Pembayaran:*\n`;
                content += `  ◦ - Bayar: Rp ${res.result.bayar}\n`;
                content += `  ◦ - Non-Subsidi: Rp ${res.result.nonSubsidi}\n`;
                content += `  ◦ - Cashback: Rp ${res.result.cashback}\n`;
                content += `  ◦ - Diskon: Rp ${res.result.discountText}\n\n`;

                content += `*Tunggakan:* ${res.result.tunggakan ? 'Gibt' : 'Nein Gibt'}\n\n`;

                content += `*Outlet:*\n`;
                content += `  ◦ - id Outlet: ${res.result.outletData.id_outlet}\n`;
                content += `  ◦ - Name Besitzer: ${res.result.outletData.nama_pemilik}\n`;
                content += `  ◦ - No. Telepon Besitzer: ${res.result.outletData.notelp_pemilik}\n`;
                content += `  ◦ - Email Besitzer: ${res.result.outletData.email}\n\n`;

                content += `${res.result.footer1}\n`;
                content += `${res.result.footer2}\n`;
            } else {
                content += 'Data tagihan nicht Gefunden.';
            }
        } else {
            content += 'Fehlgeschlagen mengambil data.';
        }
        await m.Antworten(content);
    } catch (error) {
      throw eror
    }
  };
handler.command = handler.help = ['cekbillpln','tagihanpln','pln'];
handler.tags = ['tools'];
handler.Premium = false
module.exports = handler;

//thanks to botchax