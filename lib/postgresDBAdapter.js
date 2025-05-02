const { Pool } = require('pg');

/**
 * PostgreSQL Database Adapter for WhatsApp bot
 * This adapter ensures data persistence on platforms like Heroku
 * that have ephemeral filesystems
 */
class PostgresDBAdapter {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false // Required for Heroku PostgreSQL
      }
    });
    this.tableName = 'bot_data';
    this.initialized = false;
  }

  /**
   * Initialize the database table if it doesn't exist
   */
  async init() {
    if (this.initialized) return;
    
    try {
      const client = await this.pool.connect();
      try {
        // Create table if it doesn't exist
        await client.query(`
          CREATE TABLE IF NOT EXISTS ${this.tableName} (
            id SERIAL PRIMARY KEY,
            key TEXT UNIQUE NOT NULL,
            data JSONB NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `);
        
        // Check if we have a main data record
        const result = await client.query(
          `SELECT * FROM ${this.tableName} WHERE key = 'main_data'`
        );
        
        // Insert main data record if it doesn't exist
        if (result.rows.length === 0) {
          await client.query(
            `INSERT INTO ${this.tableName} (key, data) VALUES ('main_data', $1)`,
            [JSON.stringify({})]
          );
        }
        
        this.initialized = true;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error initializing PostgreSQL database:', error);
      throw error;
    }
  }
  
  /**
   * Read data from the database
   * @returns {Object} The data object
   */
  async read() {
    await this.init();
    
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query(
          `SELECT data FROM ${this.tableName} WHERE key = 'main_data'`
        );
        
        if (result.rows.length > 0) {
          return result.rows[0].data;
        }
        
        return {};
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error reading from PostgreSQL database:', error);
      return null;
    }
  }
  
  /**
   * Write data to the database
   * @param {Object} data The data to write
   * @returns {Boolean} Success or failure
   */
  async write(data) {
    await this.init();
    
    try {
      const client = await this.pool.connect();
      try {
        await client.query(
          `UPDATE ${this.tableName} SET data = $1, updated_at = CURRENT_TIMESTAMP WHERE key = 'main_data'`,
          [JSON.stringify(data)]
        );
        return true;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error writing to PostgreSQL database:', error);
      return false;
    }
  }
}

module.exports = PostgresDBAdapter;