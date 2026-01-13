const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const itemsRouter = require('./routes/items');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/items', itemsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
