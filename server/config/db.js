import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'physics_user',
  password: process.env.DB_PASSWORD || 'physics_password',
  database: process.env.DB_DATABASE || 'physics_calculator',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create table if not exists
const initDb = async () => {
  try {
    const connection = await db.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        topic VARCHAR(50) NOT NULL,
        inputs JSON NOT NULL,
        result TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    connection.release();
    console.log('Database initialized and table ready');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initDb();

export default db;
