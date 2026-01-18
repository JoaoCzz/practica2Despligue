const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT
    )
  `);

  // INSERT FORZADO PARA DEMO
  db.run(`
    INSERT INTO items (nombre, descripcion)
    VALUES ('Item demo', 'Creado al iniciar')
  `);
});

module.exports = db;
