const { isValid } = require('mongoose').Types.ObjectId;
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([{ path: 'likes', model: 'user' }, 'owner'])
    .then((cards) => res.json(cards))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).json(card))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  if (!isValid(req.params.cardId)) {
    res.status(404).json({ message: 'Карточка не найдена' });
  } else {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (card) {
          res.json(card);
        } else {
          res.status(404).json({ message: 'Карточка не найдена' });
        }
      })
      .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
  }
};
