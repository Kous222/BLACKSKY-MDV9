const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Bitte gib zuerst den Plugin-Namen und dann den JavaScript-Code an.\nBeispiel: *.addplugin test module.exports = {...}*');

    let [name, ...codeParts] = text.split(' ');
    let code = codeParts.join(' ').trim();

    if (!name || !code) {
        return m.reply('Bitte gib einen Plugin-Namen und gültigen JavaScript-Code an.');
    }

    // Ensure name ends with .js
    if (!name.endsWith('.js')) {
        name = name + '.js';
    }

    const pluginFolder = path.join(__dirname, '../plugins'); // <-- Speicher im richtigen plugins-Ordner
    if (!fs.existsSync(pluginFolder)) {
        fs.mkdirSync(pluginFolder, { recursive: true });
    }

    const filename = path.join(pluginFolder, name);

    // Verhindern, dass bestehende Plugins überschrieben werden
    if (fs.existsSync(filename)) {
        return m.reply(`Das Plugin '${name}' existiert bereits.`);
    }

    try {
        // Always save to filesystem for local loading
        fs.writeFileSync(filename, code, 'utf8');
        
        // If PostgreSQL is available (on Heroku), also save there
        let savedToDb = false;
        
        if (process.env.DATABASE_URL) {
            try {
                const pool = new Pool({
                    connectionString: process.env.DATABASE_URL,
                    ssl: {
                        rejectUnauthorized: false // Required for Heroku PostgreSQL
                    }
                });
                
                const client = await pool.connect();
                try {
                    // Create plugins table if it doesn't exist
                    await client.query(`
                        CREATE TABLE IF NOT EXISTS plugins (
                            name VARCHAR(255) PRIMARY KEY,
                            code TEXT NOT NULL,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                        )
                    `);
                    
                    // Insert plugin into database
                    await client.query(
                        'INSERT INTO plugins (name, code) VALUES ($1, $2)',
                        [name, code]
                    );
                    
                    savedToDb = true;
                } finally {
                    client.release();
                }
            } catch (dbError) {
                console.error('Error saving plugin to database:', dbError);
                // Continue anyway as we already saved to filesystem
            }
        }
        
        // Load the plugin dynamically
        try {
            delete require.cache[filename];
            global.plugins[name] = require(filename);
            conn.logger.info(`Loaded new plugin '${name}'`);
        } catch (loadError) {
            console.error('Error loading plugin:', loadError);
            m.reply(`⚠️ Plugin saved but couldn't be loaded: ${loadError.message}`);
            return;
        }
        
        // Success message
        if (savedToDb) {
            m.reply(`✅ Das Plugin '${name}' wurde erfolgreich gespeichert (Dateisystem + PostgreSQL) und ist sofort verfügbar.`);
        } else {
            m.reply(`✅ Das Plugin '${name}' wurde erfolgreich gespeichert und ist sofort verfügbar.`);
        }
    } catch (err) {
        console.error(err);
        m.reply('❌ Fehler beim Speichern des Plugins.');
    }
};

handler.help = ['addplugin [pluginName] [JavaScript code]'];
handler.tags = ['owner'];
handler.command = /^addplugin$/i;

handler.rowner = true;

module.exports = handler;