const fetch = require('node-fetch');

let handler = async (m, { Text, usedPrefix, command }) => {
  if (command === 'checksub') {
    if (!Text) throw `*Contoh:* ${usedPrefix}checksub mydomain,idnet.my.id`;
    
    const [subdomain, domain] = Text.split(',');
    if (!subdomain || !domain) {
      throw `*Contoh:* ${usedPrefix}checksub mydomain,idnet.my.id`;
    }
    
    try {
      m.Antworten(wait);
      const checkData = await whois(subdomain, domain);
      
      if (checkData?.result?.exists) {
        const record = checkData.result.record;
        let capt = `乂 *INFORMATION SUBDOMAIN*\n\n`;
        capt += `◦  Name: ${record.name}\n`;
        capt += `◦  Tipe: ${record.type}\n`;
        capt += `◦  Content: ${record.content}\n`;
        capt += `◦  Proxied: ${record.proxied ? 'Ja' : 'Nein'}\n`;
        capt += `◦  TTL: ${record.ttl}\n`;
        capt += `◦  Dierstellen Auf: ${new Date(record.created_on).toLocaleString()}\n`;
        return m.Antworten(capt);
      } else {
        return m.Antworten(`*Subdomain ${subdomain}.${domain} verfügbar und kann benutzt!*`);
      }
    } catch (error) {
      console.error(error);
      return m.Antworten('*Terjadi error!');
    }
  }

  if (command === 'createsub' || command === 'createdomain' || command === 'createsubdomain') {
    if (!Text) throw `*Contoh:* ${usedPrefix}createsub mydomain,idnet.my.id,CNAME,linkcname,true\n\n\n*Domain Available*\n\n- idnet.my.id`;
    
    const [subdomain, domain, type, content, proxied] = Text.split(',');
    if (!subdomain || !domain || !type || !content || proxied === undefined) {
      throw `*Contoh:* ${usedPrefix}createsub mydomain,idnet.my.id,CNAME,linkcname,true\n\n\n*Domain Available*\n\n- idnet.my.id`;
    }
    
    const isProxied = proxied.toLowerCase() === 'true';
    
    try {
      m.Antworten(wait);
     
      const checkData = await whois(subdomain, domain);     
      if (checkData?.result?.exists) {
        const record = checkData.result.record;
        let capt = `乂 *SUBDOMAIN BEREITS DIBENUTZEN*\n\n`;
        capt += `◦  Name: ${record.name}\n`;
        capt += `◦  Tipe: ${record.type}\n`;
        capt += `◦  Content: ${record.content}\n`;
        capt += `◦  Proxied: ${record.proxied ? 'Ja' : 'Nein'}\n`;
        capt += `◦  TTL: ${record.ttl}\n`;
        capt += `◦  Dierstellen Auf: ${new Date(record.created_on).toLocaleString()}\n`;
        return m.Antworten(capt);
      }
      
      let response = await create(subdomain, domain, type, content, isProxied);
      if (response?.result?.Erfolgreich) {
        const result = response.result.result;
        let capt = `乂 *SUBDOMAIN GENERATOR*\n\n`;
        capt += `◦  Name: ${result.name}\n`;
        capt += `◦  Tipe: ${result.type}\n`;
        capt += `◦  Content: ${result.content}\n`;
        capt += `◦  Proxied: ${result.proxied ? 'Ja' : 'Nein'}\n`;
        capt += `◦  TTL: ${result.ttl}\n`;
        capt += `◦  Dierstellen Auf: ${new Date(result.created_on).toLocaleString()}\n`;
        m.Antworten(capt);
      } else {
        const errmsg_ = response?.result?.errors?.[0]?.Nachricht || 'Terjadi error das/der/die nicht diketahui.';
        m.Antworten(`*Fehlgeschlagen memerstellen subdomain!*\n\n*error:* ${errmsg_}`);
      }
    } catch (error) {
      console.error(error);
      m.Antworten('*Terjadi error!*');
    }
  }
};

handler.command = ['createsub', 'checksub', 'createdomain','createsubdomain'];
handler.help = ['createsub', 'checksub', 'createdomain','createsubdomain'];
handler.tags = ['tools'];
handler.Premium = false;
handler.limit = true;

module.exports = handler;

async function whois(subdomain, domain) {
  const url = `https://api.betabotz.eu.org/api/tools/whois-subdo?subdomain=${encodeURIComponent(subdomain)}&domain=${encodeURIComponent(domain)}&apikey=${lann}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
  } catch (error) {
    return null;
  }
}

async function create(subdomain, domain, type, content, proxied) {
  const url = `https://api.betabotz.eu.org/api/tools/create-subdo?subdomain=${encodeURIComponent(subdomain)}&domain=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}&content=${encodeURIComponent(content)}&proxied=${proxied}&apikey=${lann}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    return await response.json();
  } catch (error) {
    return null;
  }
}
