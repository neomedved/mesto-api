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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};
