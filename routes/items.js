const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;
  db.run('INSERT INTO items(nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// READ (todos)
router.get('/', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ (uno)
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  const { nombre, descripcion } = req.body;
  db.run('UPDATE items SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM items WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

module.exports = router;
