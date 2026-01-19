const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Usamos path.join para evitar problemas de rutas en Render
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT
    )
  `);
});

module.exports = db;