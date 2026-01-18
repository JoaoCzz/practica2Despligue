const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const itemsRouter = require('./routes/items');

// MIDDLEWARES NATIVOS (NO body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/items', itemsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
