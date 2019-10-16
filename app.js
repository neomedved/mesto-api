const express = require('express');
const path = require('path');

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);

app.use(cardsRouter);
app.use(usersRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(express.static(path.join(__dirname, 'public')));
