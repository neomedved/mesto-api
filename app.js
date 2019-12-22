const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const CustomError = require('./errors/custom-error');

const auth = require('./middlwares/auth');
const error = require('./middlwares/error');

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

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(new CustomError(404, 'Запрашиваемый ресурс не найден'));
});

app.use(error);
