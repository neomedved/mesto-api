const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const auth = require('./middlwares/auth');
const { createUser, login } = require('./controllers/users');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(cardsRouter);
app.use(usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});
