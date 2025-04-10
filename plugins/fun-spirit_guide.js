
//danapura133
//dana_putra13
//dies wm 

let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let pp = ''
  let name = m.mentionedJid[0] ? await conn.getName(m.mentionedJid[0]) : conn.user.name;
  if (!text) return conn.reply(m.chat, 'Bitte gib deinen Namen ein!', m)
  let nm = 100;
  let result = await getSpirit();
  let spirit = `*Geistführer für ${text}* 
│
Geistführer: *${result.name}*
┌─⊷
▢ \`Erklärung: *${result.meaning}*\`
└──────────────
`;
      await conn.reply(m.chat, spirit, m)
}

handler.command = handler.help = ['geistführer', 'schutzgeist', 'spiritum'];
handler.tags = ['fun'];
handler.limit = true;
handler.group = true

module.exports = handler

async function getSpirit() {
  const spirits = [
  { name: "Tagemau Putih", meaning: "du kuat und berani wie harimau, weil pendahulumu mewariskan Kraft besar padamu." },
  { name: "Lampu Tertidur", meaning: "Teransehen ngantuk aber immer geben cahaya das/der/die hangat" },
  { name: "Panda Ompong", meaning: "du menggemaskan und immer erfolgreich memerstellen person tersenyum mit keanehanmu." },
  { name: "Bebek Karet", meaning: "du immer tenang und ceria, mampu menghadapi gelombang masalah mit senyum." },
  { name: "Ninja Turtle", meaning: "du lincah und tangguh, siap melindungi das/der/die lemah mit Kraft tempurmu." },
  { name: "Kucing Kulkas", meaning: "du misterius und immer gibt in Ort-Ort das/der/die nicht terduga." },
  { name: "Sabun Wangi", meaning: "du immer membawa keharuman und kesegaran in welche auch du befindet sich." },
  { name: "Semut Klein", meaning: "du pekerja keras und immer kann diandalkan in situasi was auch." },
  { name: "Moge Suzuki", meaning: "du schnell und penuh gaya, immer werden pusat perhatian in jalanan." },
  { name: "Cupcake Pelangi", meaning: "du manis und penuh warna, immer membawa kebahagiaan und keceriaan." },
  { name: "Robot Mini", meaning: "du canggih und immer siap helfen mit intelligenz teknologi hoch." },
  { name: "Ikan Terbang", meaning: "du unik und penuh kejutan, immer melampaui batasan das/der/die gibt." },
  { name: "Ayam Goreng", meaning: "du immer disukai und dinanti durch viel person, penuh kelezatan in jeder langkahmu." },
  { name: "Kecoa Terbang", meaning: "du immer mengagetkan und bikin heboh seisi ruangan." },
  { name: "Kambing Ngebor", meaning: "du unik und immer bikin person tertawa mit tingkah lakumu das/der/die aneh." },
  { name: "Kerupuk Renyah", meaning: "du immer bikin suasana also mehr seru und nikmat." },
  { name: "Celengan Babi", meaning: "du immer speichern kejutan in in dirimu." },
  { name: "Lemari Tua", meaning: "du penuh mit cerita und kenangan masa dann." },
  { name: "Kopi Susu", meaning: "du manis und immer bikin semangat person-person in sekitarmu." },
  { name: "Sapu Lidi", meaning: "du kuat und immer kann diandalkan für membersihkan masalah." },
  { name: "Kuda Lumping", meaning: "du penuh semangat und immer tampil beda in jeder kesempatan." },
  { name: "Sepatu Roda", meaning: "du schnell und lincah, immer bergerak zu depan mit penuh gaya." },
  { name: "Bola Pingpong", meaning: "du ringan und immer bikin Spiel also mehr seru." },
  { name: "Lumba-lumba", meaning: "du klug und immer membawa keceriaan in lautan kehidupan." },
  { name: "Kucing Gemuk", meaning: "du santai und immer bikin person tersenyum mit kelucuanmu." },
  { name: "Iguana Pink", meaning: "du eksotis und immer menarik perhatian mit warnamu das/der/die unik." },
  { name: "Bantal Guling", meaning: "du nyaman und immer dibutuhkan wenn Zeit Pause." },
  { name: "Komputer Jadul", meaning: "du klasik und penuh mit pengetahuan in in dirimu." },
  { name: "Kasur Empuk", meaning: "du immer geben kenyamanan und ketenangan." },
  { name: "Bola Bekel", meaning: "du kecil aber immer geben kebahagiaan in jeder Spiel." },
  { name: "Es Krim Pelangi", meaning: "du manis und penuh warna, immer menyegarkan Tag-Tag." },
  { name: "Biskuit Coklat", meaning: "du immer bikin ketagihan mit kelezatanmu das/der/die nicht tertahankan." },
  { name: "Nasi Padang", meaning: "du immer bikin kenyang und puas mit kelezatanmu das/der/die khas." },
  { name: "Roti Bakar", meaning: "du sederhana aber immer bikin person merasa nyaman." },
  { name: "Sepeda Ontel", meaning: "du klasik und immer geben kesenangan in jeder perjalanan." },
  { name: "Sate Kambing", meaning: "du gurih und immer also favorit in jeder kesempatan." },
  { name: "Kue Cubit", meaning: "du kecil aber immer bikin person bahagia mit rasamu das/der/die enak." },
  { name: "Bakso Urat", meaning: "du kuat und immer geben kenikmatan in jeder gigitan." },
  { name: "Es Kelapa", meaning: "du segar und immer bikin adem in wenn-wenn panas." },
  { name: "Siomay Bandung", meaning: "du immer bikin ketagihan mit rasa khasmu das/der/die lezat." },
  { name: "Bajigur Hangat", meaning: "du immer bikin suasana also hangat und nyaman." },
  { name: "Martabak Manis", meaning: "du penuh kejutan mit isi das/der/die manis und nikmat." },
  { name: "Permen Karet", meaning: "du immer bikin suasana also mehr ceria mit kenikmatanmu das/der/die kenyal." },
  { name: "Pisang Goreng", meaning: "du immer bikin suasana also mehr hangat und nyaman." },
  { name: "Telur Dadar", meaning: "du sederhana aber immer bikin person puas mit kelezatanmu." },
  { name: "Es Buah", meaning: "du segar und penuh warna, immer bikin Tag also mehr ceria." },
  { name: "Mie Goreng", meaning: "du immer bikin kenyang und puas mit rasamu das/der/die lezat." },
  { name: "Puding Coklat", meaning: "du manis und immer bikin suasana also mehr nyaman." },
  { name: "Gulai Kambing", meaning: "du reich rasa und immer bikin person ketagihan mit kelezatanmu." },
  { name: "Kue Nastar", meaning: "du immer hadir in wenn-wenn spesial mit rasa das/der/die manis und enak." },
  { name: "Krupuk Ikan", meaning: "du renyah und immer bikin suasana also mehr seru." },
  { name: "Es Teler", meaning: "du segar und penuh kejutan mit campuran rasa das/der/die enak." },
  { name: "Rujak Buah", meaning: "du segar und immer bikin suasana also mehr hidup mit rasamu das/der/die pedas und manis." },
  { name: "Soto Ayam", meaning: "du immer bikin hangat und puas mit kuahmu das/der/die lezat." },
  { name: "Tahu Bulat", meaning: "du immer hadir in momen-momen das/der/die pas mit rasa das/der/die enak." },
  { name: "Keripik Singkong", meaning: "du renyah und immer bikin suasana also mehr seru." },
  { name: "Kacang Goreng", meaning: "du immer also camilan favorit in jeder kesempatan." },
  { name: "Tongseng Sapi", meaning: "du reich rasa und immer bikin person ketagihan mit kelezatanmu." },
  { name: "Sate Padang", meaning: "du immer bikin kenyang und puas mit rasa khasmu das/der/die lezat." },
  { name: "Nasi Uduk", meaning: "du immer bikin kenyang und puas mit rasa gurihmu das/der/die enak." },
  { name: "Cendol Dawet", meaning: "du segar und immer bikin suasana also mehr adem in wenn-wenn panas." },
  { name: "Onde-onde", meaning: "du immer hadir in wenn-wenn spesial mit rasa das/der/die manis und enak." },
  { name: "Kolak Pisang", meaning: "du manis und immer bikin suasana also mehr hangat und nyaman." },
  { name: "Macan Kumbang", meaning: "du misterius und kuat, wie macan das/der/die selten teransehen aber immer waspada." },
  { name: "Kuda Emas", meaning: "du berharga und kuat, siap für rennen menuju kesuksesan." },
  { name: "Elang Biru", meaning: "du memiliki visi das/der/die tajam und kann meansehen peluang von weit." },
  { name: "Indomie Goreng", meaning: "Immer bikin kenyang und bahagia" },
  { name: "Es Krim Meleleh", meaning: "Immer mencairkan suasana mit rasa manisnya" },
  { name: "Bakso Ulet", meaning: "Immer gigih und bulat in menghadapi masalah" },
  { name: "Lem super", meaning: "Immer lengket in situasi das/der/die rumit" },
  { name: "Kecap Manis", meaning: "Immer geben sentuhan manis in hidup" },
  { name: "Sabun Mandi", meaning: "Immer bersih und wangi" },
  { name: "Kopi Tumpah", meaning: "Immer bersemangat, aber kadang berantakan" },
  { name: "Sepeda Ontel", meaning: "Immer klasik und sederhana" },
  { name: "Roti Bakar", meaning: "Immer hangat und enak" },
  { name: "Kucing Kampung", meaning: "Immer mandiri und penuh abenteuer" },
  { name: "Stundenu Pahit", meaning: "Immer memberi Kraft obwohl nicht enak in awal" },
  { name: "Teh Celup", meaning: "Immer geben rasa hangat in hati" },
  { name: "Tas Kresek", meaning: "Immer ringan und praktis" },
  { name: "Es Kelapa", meaning: "Immer segar und menyegarkan" },
  { name: "Motor Astrea", meaning: "Immer setia und bandel" },
  { name: "Mie Instan", meaning: "Immer schnell und mengenyangkan" },
  { name: "Bolu Kukus", meaning: "Immer lembut und manis" },
  { name: "Tahu Bulat", meaning: "Immer enak in alle suasana" },
  { name: "Nasi Uduk", meaning: "Immer cocok in alle Zeit" },
  { name: "Susu Kental Manis", meaning: "Immer hinzufügen kenikmatan" },
  { name: "Kopi Hitam", meaning: "Immer memberi semangat in pagi Tag" },
  { name: "Kacang Goreng", meaning: "Immer asyik für ngemil" },
  { name: "Ayam Goreng Tepung", meaning: "Immer renyah und nikmat" },
  { name: "Sambal Terasi", meaning: "Immer pedas und menggigit" },
  { name: "Ketoprak", meaning: "Immer mengenyangkan und lezat" },
  { name: "Cendol Dawet", meaning: "Immer segar in siang Tag" },
  { name: "Gado-Gado", meaning: "Immer penuh warna und rasa" },
  { name: "Pisang Goreng", meaning: "Immer manis und gurih" },
  { name: "Martabak Manis", meaning: "Immer lezat und memanjakan lidah" },
  { name: "Bubur Ayam", meaning: "Immer hangat und mengenyangkan" },
  { name: "Soto Ayam", meaning: "Immer reich rasa und gurih" },
  { name: "Nasi Padang", meaning: "Immer penuh mit kenikmatan" },
  { name: "Rendang Daging", meaning: "Immer empuk und reich rempah" },
  { name: "Nasi Goreng", meaning: "Immer praktis und enak" },
  { name: "Bakmi Jawa", meaning: "Immer menggugah selera" },
  { name: "Sate Ayam", meaning: "Immer enak in alle acara" },
  { name: "Gulai Kambing", meaning: "Immer reich rasa und lezat" },
  { name: "Rawon Sapi", meaning: "Immer hitam und nikmat" },
  { name: "Ikan Bakar", meaning: "Immer gurih und enak" },
  { name: "Pepes Tahu", meaning: "Immer lezat und bergizi" },
  { name: "Tempe Mendoan", meaning: "Immer gurih und renyah" },
  { name: "Keripik Singkong", meaning: "Immer renyah und menggoda" },
  { name: "Jus Alpukat", meaning: "Immer segar und menyehatkan" },
  { name: "Es Teler", meaning: "Immer segar und nikmat" },
  { name: "Bubur Kacang Hijau", meaning: "Immer hangat und mengenyangkan" },
  { name: "Bakpao", meaning: "Immer lembut und enak" },
  { name: "Pempek", meaning: "Immer gurih und kenyal" },
  { name: "Sosis Bakar", meaning: "Immer enak in alle suasana" },
  { name: "Lumpia Semarang", meaning: "Immer gurih und nikmat" },
  { name: "Otak-Otak", meaning: "Immer enak und gurih" },
  { name: "Pastel", meaning: "Immer renyah und nikmat" },
  { name: "Cilok", meaning: "Immer kenyal und enak" },
  { name: "Bakwan Jagung", meaning: "Immer gurih und lezat" },
  { name: "Risol", meaning: "Immer renyah und enak" },
  { name: "Combro", meaning: "Immer gurih und pedas" },
  { name: "Getuk", meaning: "Immer manis und kenyal" },
  { name: "Tape Singkong", meaning: "Immer manis und segar" },
  { name: "Wedang Jahe", meaning: "Immer hangat und menenangkan" },
  { name: "Dawet Ayu", meaning: "Immer segar und menggoda" },
  { name: "Es Buah", meaning: "Immer segar und penuh warna" },
  { name: "Es Doger", meaning: "Immer manis und menyegarkan" },
  { name: "Tengkleng", meaning: "Immer gurih und enak" },
  { name: "Gulai Nangka", meaning: "Immer reich rasa und lezat" },
  { name: "Coto Makassar", meaning: "Immer gurih und nikmat" },
  { name: "Nasi Liwet", meaning: "Immer enak und mengenyangkan" },
  { name: "Bubur Sumsum", meaning: "Immer lembut und manis" },
  { name: "Kue Cubit", meaning: "Immer manis und lembut" },
  { name: "Bolu Pandan", meaning: "Immer harum und enak" },
  { name: "Onde-Onde", meaning: "Immer kenyal und manis" },
  { name: "Serabi Solo", meaning: "Immer lembut und gurih" },
  { name: "Lemper Ayam", meaning: "Immer gurih und lezat" },
  { name: "Kue Lumpur", meaning: "Immer lembut und manis" },
  { name: "Kue Lapis", meaning: "Immer warna-warni und manis" },
  { name: "Kue Putu", meaning: "Immer hangat und manis" },
  { name: "Es Pisang Ijo", meaning: "Immer segar und manis" },
  { name: "Klepon", meaning: "Immer manis und kenyal" },
  { name: "Martabak Telur", meaning: "Immer gurih und enak" },
  { name: "Ayam Penyet", meaning: "Immer pedas und menggigit" },
  { name: "Ikan Asin", meaning: "Immer gurih und asin" },
  { name: "Sop Buntut", meaning: "Immer reich rasa und nikmat" },
  { name: "Bakso Malang", meaning: "Immer gurih und lezat" },
  { name: "Pempek Palembang", meaning: "Immer enak und gurih" },
  { name: "Tahu Gejrot", meaning: "Immer pedas und segar" },
  { name: "Gepuk Daging", meaning: "Immer empuk und lezat" },
  { name: "Ayam Betutu", meaning: "Immer reich bumbu und enak" },
  { name: "Ikan Gurame", meaning: "Immer gurih und nikmat" },
  { name: "Udang Goreng", meaning: "Immer renyah und enak" },
  { name: "Cumi Saus Tiram", meaning: "Immer gurih und lezat" },
  { name: "Royco Ayam", meaning: "Immer hinzufügen rasa gurih auf jeder kesempatan" },
  { name: "Honda Supra", meaning: "Immer kann diandalkan in jalanan" },
  { name: "Kompor Meledak", meaning: "Immer geben kehangatan das/der/die luar biasa" },
  { name: "Es Stein Menangis", meaning: "Immer mencair in wenn das/der/die nicht terduga" },
  { name: "Teh Botol Sosro", meaning: "Immer segar in alle suasana" },
  { name: "Payung Bocor", meaning: "Immer geben kejutan wenn hujan" },
  { name: "Kursi Tertawa", meaning: "Immer memerstellenmu nyaman mit gayanya das/der/die lucu" },
  { name: "Motor Vespa", meaning: "Immer klasik und penuh gaya" },
  { name: "Ember Bocor", meaning: "Immer berfungsi walau nicht sempurna" },
  { name: "Bantal Gebuk", meaning: "Immer menemani tidurmu mit kenyamanan" },
  { name: "Mie Sedap", meaning: "Immer schnell und mengenyangkan" },
  { name: "Komputer Ngadat", meaning: "Immer menantang kesabaranmu" },
  { name: "Handphone Jadul", meaning: "Immer setia obwohl ketinggalan zaman" },
  { name: "Kulkas Berisik", meaning: "Immer bising aber berguna" },
  { name: "Rokok Gudang Garam", meaning: "Immer nikmat in jeder tarikan" },
  { name: "Radio Tua", meaning: "Immer menghidupkan suasana" },
  { name: "Sepatu Butut", meaning: "Immer nyaman obwohl usang" },
  { name: "Blender Bising", meaning: "Immer ribut aber helfen" },
  { name: "Sapu Ijuk", meaning: "Immer membersihkan mit efektif" },
  { name: "Kipas Angin", meaning: "Immer geben angin segar" },
  { name: "Rice Cooker", meaning: "Immer memasak nasi mit sempurna" },
  { name: "Senter Mati", meaning: "Immer gibt wenn dibutuhkan" },
  { name: "Pisau Tumpul", meaning: "Immer menantang in memotong" },
  { name: "Honda Beat", meaning: "Immer lincah in jalanan" },
  { name: "Kerupuk Udang", meaning: "Immer renyah und nikmat" },
  { name: "Gitar Sumbang", meaning: "Immer geben nada das/der/die nicht terduga" },
  { name: "Meja Bergoyang", meaning: "Immer bergoyang wenn benutzt" },
  { name: "Jok Motor", meaning: "Immer empuk und nyaman" },
  { name: "Tikar Lipat", meaning: "Immer praktis in alle acara" },
  { name: "Paku Karet", meaning: "Immer lentur und nicht terduga" },
  { name: "Lemari Besi", meaning: "Immer kuat und kokoh" },
  { name: "Sepeda BMX", meaning: "Immer siap für abenteuer" },
  { name: "Tas Belanja", meaning: "Immer praktis und berguna" },
  { name: "Lilin Meleleh", meaning: "Immer geben cahaya in kegelapan" },
  { name: "Kabel Kusut", meaning: "Immer memerstellen bingung" },
  { name: "Honda CBR", meaning: "Immer schnell und penuh gaya" },
  { name: "Sendok Miring", meaning: "Immer memberi sensasi berbeda" },
  { name: "Gelas Retak", meaning: "Immer siap walau nicht sempurna" },
  { name: "Lampu Schlafen", meaning: "Immer geben cahaya lembut" },
  { name: "Karet Gelang", meaning: "Immer fleksibel und berguna" },
  { name: "Honda Vario", meaning: "Immer tangguh in alle medan" },
  { name: "Botol Kaca", meaning: "Immer jernih und berguna" },
  { name: "Rantang Susun", meaning: "Immer membawa bekal mit rapi" },
  { name: "Kunci Inggris", meaning: "Immer siap für perbaikan" },
  { name: "Honda Tiger", meaning: "Immer gagah und kuat" },
  { name: "Toples Kue", meaning: "Immer penuh kejutan manis" },
  { name: "Wajan Teflon", meaning: "Immer anti lengket" },
  { name: "Honda Scoopy", meaning: "Immer trendy und stylish" },
  { name: "Kasur Busa", meaning: "Immer empuk und nyaman" },
  { name: "Sapu Lidi", meaning: "Immer membersihkan mit efektif" },
  { name: "Panci Presto", meaning: "Immer schnell und praktis" },
  { name: "Honda PCX", meaning: "Immer mewah und nyaman" },
  { name: "Talenan Holz", meaning: "Immer setia menemani dapur" },
  { name: "Gergaji Tumpul", meaning: "Immer menantang in memotong" },
  { name: "Honda Blade", meaning: "Immer tajam in jalanan" },
  { name: "Bantal Kapuk", meaning: "Immer empuk und lembut" },
  { name: "Penglöschen Karet", meaning: "Immer siap menglöschen kesalahan" },
  { name: "Honda Revo", meaning: "Immer tangguh und hemat" },
  { name: "Laci Meja", meaning: "Immer speichern rahasia" },
  { name: "Stoples Kaca", meaning: "Immer jernih und berisi" },
  { name: "Honda Verza", meaning: "Immer kuat und tahan lama" },
  { name: "Cermin Retak", meaning: "Immer geben pantulan unik" },
  { name: "Pena Bocor", meaning: "Immer meninggalkan jejak" },
  { name: "Honda CB150R", meaning: "Immer schnell und bertenaga" },
  { name: "Baskom Plastik", meaning: "Immer ringan und praktis" },
  { name: "Paku Beton", meaning: "Immer kuat und kokoh" },
  { name: "Honda MegaPro", meaning: "Immer gagah in jalanan" },
  { name: "Gembok Rusak", meaning: "Immer menantang keamanan" },
  { name: "Sandal Jepit", meaning: "Immer santai und nyaman" },
  { name: "Honda Win", meaning: "Immer gewinnen in alle medan" },
  { name: "Lemari Plastik", meaning: "Immer ringan und praktis" },
  { name: "Kulkas Mini", meaning: "Immer dingin und efisien" },
  { name: "Honda CRF", meaning: "Immer tangguh in alle medan" },
  { name: "Cangkir Teh", meaning: "Immer menghangatkan suasana" },
  { name: "Kompor Gas", meaning: "Immer schnell und panas" },
  { name: "Honda Monkey", meaning: "Immer lucu und unik" },
  { name: "Cerek Air", meaning: "Immer siap menyajikan kehangatan" },
  { name: "Selimut Tebal", meaning: "Immer hangat und nyaman" },
  { name: "Honda Beat Street", meaning: "Immer lincah und tangguh" },
  { name: "Meja Rias", meaning: "Immer anzeigen das/der/die terbaik" },
  { name: "Gelas Plastik", meaning: "Immer ringan und praktis" },
  { name: "Honda X-ADV", meaning: "Immer siap für abenteuer" },
  { name: "Rak Buku", meaning: "Immer penuh pengetahuan" },
  { name: "Sisir Patah", meaning: "Immer berfungsi obwohl nicht sempurna" },
  { name: "Honda Rebel", meaning: "Immer berjiwa pemberontak" },
  { name: "Bantal Guling", meaning: "Immer nyaman in pelukan" },
  { name: "Honda CRF250", meaning: "Immer siap menghadapi herausforderung" },
  { name: "Lemari Es", meaning: "Immer speichern kesegaran" },
  { name: "Honda Forza", meaning: "Immer kuat und bertenaga" },
  { name: "Piring Retak", meaning: "Immer menantang mit keunikannya" },
  { name: "Tagemau Loreng", meaning: "du tangguh und memiliki Kraft für melindungi und angreifen." },
  { name: "Gajah Putih", meaning: "du bijaksana und memiliki Kraft besar, lambang von keberanian und keteguhan hati." },
  { name: "Banteng Sakti", meaning: "du kuat und penuh semangat, nicht takut menghadapi rintangan." },
  { name: "Ular Raksasa", meaning: "du memiliki weisheit und Kraft tersembunyi, siap angreifen wenn benötigt." },
  { name: "Ikan Dewa", meaning: "du tenang und penuh kedamaian, membawa rezeki und glück." },
  { name: "Kucing Hitam", meaning: "du misterius und penuh mit rahasia, membawa glück für das/der/die memahami." },
  { name: "Rusa Emas", meaning: "du anggun und berharga, immer dihargai durch person-person in sekitarmu." },
  { name: "Singa Bermahkota", meaning: "du lahir als pemimpin, memiliki Kraft und weisheit ein raja." },
  { name: "Kijang Perak", meaning: "du schnell und cekatan, immer waspada und siap für springen mehr weit." },
  { name: "Kipas Angin Kelereng", meaning: "Immer geben angin segar mit kocaknya" },
  { name: "Penglöschen Ajaib", meaning: "Mampu menglöschen kesalahan mit Art das/der/die lucu" },
  { name: "Kertas Guling Goyang", meaning: "Tak pernah diam und immer menghibur" },
  { name: "Pulpen Melambai", meaning: "Immer memberi tanda mit Art das/der/die unik" },
  { name: "Tali minen Tertawa", meaning: "Memerstellen pekerjaan werden mehr menyenangkan" },
  { name: "Botol Minyak Mengejek", meaning: "Seringkali memberi komentar lucu" },
  { name: "Topi Terbang", meaning: "Memerstellen kepala werden mehr ringan mit keunikannya" },
  { name: "Payung Terbalik", meaning: "Immer membalikkan situasi mit Art das/der/die nicht terduga" },
  { name: "Piring Gehen", meaning: "Tak pernah tinggal diam in tempatnya" },
  { name: "Ember Tertawa", meaning: "Menghadirkan keceriaan in jeder kegiatan" },
  { name: "Lampu Schlafen Tertidur", meaning: "Teransehen faul-malasan aber immer geben cahaya das/der/die hangat" },
  { name: "Gelas Bergoyang", meaning: "Immer geben sensasi das/der/die berbeda in menikmati minuman" },
  { name: "Kunci Kamar Mandi Keriting", meaning: "Immer memerstellen masalah kecil werden lucu" },
  { name: "Pisau Potong Hati", meaning: "Mampu memotong rasa sakit mit kelebihannya" },
  { name: "Tisu Terbang", meaning: "Immer siap helfen mit schnell und lincah" },
  { name: "Kardus Kocak", meaning: "Tak pernah membosankan, immer speichern kejutan in dalamnya" },
  { name: "Kain Lap Terbang", meaning: "Berguna für membersihkan mit Art das/der/die seru" },
  { name: "Sendok Garpu Goyang", meaning: "Werden pasangan das/der/die serasi in jeder essen" },
  { name: "Tempat Pensil Teriak", meaning: "Tak pernah diam und immer meminta perhatian" },
  { name: "Buku Lucu", meaning: "Mampu memerstellenmu tertawa in jeder halaman" },
  { name: "Cermin Menggigil", meaning: "Immer geben pantulan das/der/die lucu" },
  { name: "Kamera Gelantungan", meaning: "Immer mengabadikan momen-momen lucu" },
  { name: "Cangkir Cemberut", meaning: "Obwohl teransehen cemberut, aber immer menyajikan minuman mit gut" },
  { name: "Kursi Muter", meaning: "Memberikan sensasi berputar in jeder duduknya" },
  { name: "Lemari Tertidur", meaning: "Immer geben kenyamanan das/der/die nicht terduga" },
  { name: "Tas Terbang", meaning: "Immer membawa artikel-artikel mit gaya das/der/die unik" },
  { name: "Sepatu Terbang", meaning: "Memerstellen langkahmu mehr ringan mit kelebihannya" },
  { name: "Kunci Jalan Bergosip", meaning: "Tak pernah diam über hal-hal in sekitarnya" },
  { name: "Sisir Sibuk", meaning: "Immer geben gaya das/der/die berbeda auf jeder rambut" },
  { name: "Gelas Tertawa", meaning: "Bergoyang-goyang wenn diisi mit minuman" },
  { name: "Pisau Potong Goyang", meaning: "Immer geben irama das/der/die unik wenn benutzt" },
  { name: "Meja Ngobrol", meaning: "Tak pernah sepi von percakapan" },
  { name: "Piring Berguling", meaning: "Mag berputar-putar wenn disentuh" },
  { name: "Kompor Berpikir", meaning: "Immer geben solusi das/der/die cerdas für jeder masalah" },
  { name: "Kulkas Goyang", meaning: "Bergetar wenn diisi mit essen" },
  { name: "Cangkir Rennen", meaning: "Tak pernah kann diam in tempatnya" },
  { name: "Lampu Malam Faul", meaning: "Teransehen faul aber immer geben cahaya das/der/die lembut" },
  { name: "Botol Kecap Keriting", meaning: "Immer geben sentuhan das/der/die berbeda auf masakan" },
  { name: "Sendok Garpu Bergoyang", meaning: "Immer menari-nari wenn benutzt" },
  { name: "Topi Tertawa", meaning: "Teransehen ceria in oben kepala wer auch" },
  { name: "Korek Api Faul", meaning: "Teransehen faul aber immer geben api das/der/die menyala" },
  { name: "Panci Klug", meaning: "Immer geben masakan das/der/die sempurna" },
  { name: "Kertas Rennen", meaning: "Tak pernah kann diam in meja" },
  { name: "Pensil Penghilang", meaning: "Immer menghilang wenn dibutuhkan" },
  { name: "Penglöschen Pelawak", meaning: "Immer memerstellen kesalahan werden lucu" },
  { name: "Buku Bergoyang", meaning: "Immer geben sensasi das/der/die berbeda wenn dibaca" },
  { name: "Ponsel Klug", meaning: "Immer geben Antwort das/der/die genau für jeder frage" },
  { name: "Gunting Goyang", meaning: "Immer menari-nari wenn benutzt" },
  { name: "Rak Buku Klug", meaning: "Immer geben buku das/der/die sesuai mit minatmu" },
  { name: "Kipas Angin Tertawa", meaning: "Teransehen bahagia wenn berputar-putar" },
  { name: "Sabun Mandi Faul", meaning: "Teransehen faul aber immer geben kebersihan das/der/die menyegarkan" },
  { name: "Pulpen Klug", meaning: "Immer geben ide das/der/die brilian" },
  { name: "Gelas Klug", meaning: "Immer geben minuman das/der/die sesuai mit keinginanmu" },
  { name: "Botol Air Mengejek", meaning: "Immer geben komentar das/der/die lucu wenn diminum" },
  { name: "Bantal Bergoyang", meaning: "Tak pernah kann diam wenn in oben kasur" },
  { name: "Kursi Bergoyang", meaning: "Immer geben sensasi das/der/die menyenangkan wenn benutzt" },
  { name: "Rak Buku Bergoyang", meaning: "Immer geben sensasi das/der/die unik wenn buku diletakkan in atasnya" },
  { name: "Tas Klug", meaning: "Immer geben artikel das/der/die benötigt wenn dibutuhkan" },
  { name: "Piring Rennen", meaning: "Tak pernah kann diam in tempatnya" },
  { name: "Panci Zauberer", meaning: "Mampu memerstellen masakan das/der/die ajaib" },
  { name: "Sendok Garpu Terbalik", meaning: "Tak pernah kann diletakkan mit richtig" },
  { name: "Kotak Pensil Berguling", meaning: "Immer menggelinding wenn diletakkan in meja" },
  { name: "Kunci Kamar Mandi Tertawa", meaning: "Tak pernah kann diam und immer tertawa-tawa" },
  { name: "Kardus Faul", meaning: "Immer teransehen faul aber immer geben perlindungan das/der/die gut" },
  { name: "Lampu Tertidur", meaning: "Teransehen ngantuk aber immer geben cahaya das/der/die hangat" },
  { name: "Anjing Pelacak", meaning: "du setia und penuh dedikasi, immer finden jalan menuju tujuanmu." },
  ];                
const spiritIndex = Math.floor(Math.random() * spirits.length);
const spirit = spirits[spiritIndex];

return {
name: spirit.name,
meaning: spirit.meaning,
};
}

// einmal gua ansehen dies sc in verkaufen auto enc alle Funktion neu
//DIES SC FREE






















































































































































































































































































































































































































































// einmal gua ansehen dies sc in verkaufen auto enc alle Funktion neu
//DIES SC FREE























































































































































































// einmal gua ansehen dies sc in verkaufen auto enc alle Funktion neu
//DIES SC FREE