const express = require('express');
const path = require('path');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);

app.use(cardsRouter);
app.use(usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});
