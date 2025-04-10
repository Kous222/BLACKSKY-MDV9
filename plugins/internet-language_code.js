let handler = async m => m.reply(`
┏━━°❀❬ *Sprachcode Liste* ❭❀°━━┓
┃
┃• af : Afrikaans
┃• sq : Albanisch
┃• ar : Arabisch
┃• hy : Armenisch
┃• ca : Katalanisch
┃• zh : Chinesisch
┃• zh-cn : Chinesisch (Mandarin/China)
┃• zh-tw : Chinesisch (Mandarin/Taiwan)
┃• zh-yue : Chinesisch (Kantonesisch)
┃• hr : Kroatisch
┃• cs : Tschechisch
┃• da : Dänisch
┃• nl : Niederländisch
┃• en : Englisch
┃• en-au : Englisch (Australien)
┃• en-uk : Englisch (Vereinigtes Königreich)
┃• en-us : Englisch (Vereinigte Staaten)
┃• eo : Esperanto
┃• fi : Finnisch
┃• fr : Französisch
┃• de : Deutsch
┃• el : Griechisch
┃• ht : Haitianisches Kreol
┃• hi : Hindi
┃• hu : Ungarisch
┃• is : Isländisch
┃• id : Indonesisch
┃• it : Italienisch
┃• ja : Japanisch
┃• ko : Koreanisch
┃• la : Latein
┃• lv : Lettisch
┃• mk : Mazedonisch
┃• no : Norwegisch
┃• pl : Polnisch
┃• pt : Portugiesisch
┃• pt-br : Portugiesisch (Brasilien)
┃• ro : Rumänisch
┃• ru : Russisch
┃• sr : Serbisch
┃• sk : Slowakisch
┃• es : Spanisch
┃• es-es : Spanisch (Spanien)
┃• es-us : Spanisch (Vereinigte Staaten)
┃• sw : Suaheli
┃• sv : Schwedisch
┃• ta : Tamil
┃• th : Thai
┃• tr : Türkisch
┃• vi : Vietnamesisch
┃• cy : Walisisch
┗━━━━━━━━━━━━━━━━
`.trim())
handler.help = ['sprachcode', 'sprachliste', 'sprachchodes']
handler.tags = ['internet']
handler.command = /^(sprachcode|sprachliste|sprachchodes)$/i

module.exports = handler
