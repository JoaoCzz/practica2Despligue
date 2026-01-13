const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Creo la Tabla 
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
