const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Custom auth state handler for WhatsApp using PostgreSQL
 * This preserves WhatsApp session data across Heroku restarts
 */
const usePostgreSQLAuthState = async (tableName = 'wa_sessions') => {
  // Initialize PostgreSQL connection
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Required for Heroku PostgreSQL
    }
  });
  
  // Ensure the table exists
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id VARCHAR(255) PRIMARY KEY,
          data BYTEA,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error initializing PostgreSQL session table:', error);
  }
  
  /**
   * Write session data to PostgreSQL
   * @param {string} key - Session key
   * @param {any} value - Session data 
   */
  const writeData = async (key, value) => {
    // Convert data to Buffer if it's not already
    let data;
    if (value instanceof Buffer) {
      data = value;
    } else if (typeof value === 'string') {
      data = Buffer.from(value);
    } else {
      data = Buffer.from(JSON.stringify(value));
    }
    
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          INSERT INTO ${tableName} (id, data, updated_at) 
          VALUES ($1, $2, CURRENT_TIMESTAMP)
          ON CONFLICT (id) 
          DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP
        `, [key, data]);
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error writing session data to PostgreSQL:', error);
    }
  };
  
  /**
   * Read session data from PostgreSQL
   * @param {string} key - Session key
   * @returns {Buffer|null} Session data
   */
  const readData = async (key) => {
    try {
      const client = await pool.connect();
      try {
        const result = await client.query(`
          SELECT data FROM ${tableName} WHERE id = $1
        `, [key]);
        
        if (result.rows.length > 0) {
          return result.rows[0].data;
        }
        return null;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error reading session data from PostgreSQL:', error);
      return null;
    }
  };
  
  /**
   * Remove session data from PostgreSQL
   * @param {string} key - Session key
   */
  const removeData = async (key) => {
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          DELETE FROM ${tableName} WHERE id = $1
        `, [key]);
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error removing session data from PostgreSQL:', error);
    }
  };
  
  /**
   * Save WhatsApp credentials
   * @param {Object} data - WhatsApp credentials
   */
  const saveCreds = async (data) => {
    // Store as creds.json in PostgreSQL
    await writeData('creds.json', JSON.stringify(data, null, 2));
    
    // Also save a backup to the filesystem if not on Heroku
    if (!process.env.DATABASE_URL) {
      const sessionsDir = './sessions';
      if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(sessionsDir, 'creds.json'), JSON.stringify(data, null, 2));
    }
  };
  
  /**
   * Load WhatsApp auth state
   */
  const state = {
    creds: {},
    keys: {}
  };
  
  // Try to load creds from PostgreSQL
  const credsData = await readData('creds.json');
  if (credsData) {
    try {
      state.creds = JSON.parse(credsData.toString());
    } catch (error) {
      console.error('Error parsing creds from PostgreSQL:', error);
      
      // Try to load from filesystem as fallback
      if (fs.existsSync('./sessions/creds.json')) {
        state.creds = JSON.parse(fs.readFileSync('./sessions/creds.json', 'utf8'));
      }
    }
  } else if (fs.existsSync('./sessions/creds.json')) {
    // Load from filesystem as fallback
    state.creds = JSON.parse(fs.readFileSync('./sessions/creds.json', 'utf8'));
    
    // Save to PostgreSQL for future use
    await writeData('creds.json', JSON.stringify(state.creds, null, 2));
  }
  
  // Load keys if they exist
  const loadKeys = async () => {
    const keys = {};
    
    // First, try to get list of keys from the sessions table
    try {
      const client = await pool.connect();
      try {
        const result = await client.query(`
          SELECT id FROM ${tableName} WHERE id LIKE 'key-%'
        `);
        
        for (const row of result.rows) {
          const data = await readData(row.id);
          if (data) {
            const keyId = row.id.substring(4); // remove 'key-' prefix
            keys[keyId] = JSON.parse(data.toString());
          }
        }
        
        return keys;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error loading keys from PostgreSQL:', error);
      
      // Try filesystem as fallback
      const sessionsDir = './sessions';
      if (fs.existsSync(sessionsDir)) {
        const files = fs.readdirSync(sessionsDir).filter(file => file.startsWith('pre-key-') || file.startsWith('session-') || file.startsWith('sender-key'));
        
        for (const file of files) {
          const data = fs.readFileSync(path.join(sessionsDir, file));
          const keyId = file;
          
          keys[keyId] = JSON.parse(data.toString());
          
          // Save to PostgreSQL for future use
          await writeData(`key-${keyId}`, data);
        }
      }
      
      return keys;
    }
  };
  
  state.keys = await loadKeys();
  
  /**
   * Save a key to storage
   * @param {string} key - Key ID
   * @param {any} value - Key data
   */
  const saveKey = async (key, value) => {
    if (value) {
      state.keys[key] = value;
      await writeData(`key-${key}`, JSON.stringify(value));
      
      // Also save to filesystem as backup if not on Heroku
      if (!process.env.DATABASE_URL) {
        const sessionsDir = './sessions';
        if (!fs.existsSync(sessionsDir)) {
          fs.mkdirSync(sessionsDir, { recursive: true });
        }
        fs.writeFileSync(path.join(sessionsDir, key), JSON.stringify(value));
      }
    } else {
      delete state.keys[key];
      await removeData(`key-${key}`);
      
      // Also remove from filesystem if not on Heroku
      if (!process.env.DATABASE_URL) {
        const sessionsDir = './sessions';
        if (fs.existsSync(path.join(sessionsDir, key))) {
          fs.unlinkSync(path.join(sessionsDir, key));
        }
      }
    }
  };
  
  /**
   * Get a key from storage
   * @param {string} key - Key ID
   * @returns {any} Key data
   */
  const getKey = (key) => {
    return state.keys[key];
  };
  
  return {
    state,
    saveCreds,
    writeData,
    readData,
    removeData,
    clearState: async () => {
      try {
        const client = await pool.connect();
        try {
          await client.query(`DELETE FROM ${tableName}`);
          state.creds = {};
          state.keys = {};
        } finally {
          client.release();
        }
      } catch (error) {
        console.error('Error clearing state in PostgreSQL:', error);
      }
    }
  };
};

module.exports = { usePostgreSQLAuthState };