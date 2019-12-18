const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isValid } = require('mongoose').Types.ObjectId;
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  if (!isValid(req.params.userId)) {
    res.status(404).json({ message: 'Пользователь не найден' });
  } else {
    User.findById(req.params.userId)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'Пользователь не найден' });
        }
      })
      .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
  }
};

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'ca0c855fe4365d8c59ca3f150ff5da7caf24bc2263594ecfda93b60f0ccbb33f');

      res.cookie('jwt', token, {
        maxAge: '7d',
        httpOnly: true,
        sameSite: true,
      })
        .end();
    })
    .catch((err) => res.status(401).json({ message: err.message }));
};
