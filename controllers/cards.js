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
  const { userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).json(card))
    .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  if (!isValid(cardId)) {
    res.status(404).json({ message: 'Карточка не найдена' });
  } else {
    Card.findById(cardId)
      .populate([{ path: 'likes', model: 'user' }, 'owner'])
      .then((card) => {
        if (!card) {
          res.status(404).json({ message: 'Карточка не найдена' });
        } else if (String(card.owner._id) !== userId) {
          res.status(403).send('Вы не можете удалить эту карточку');
        } else {
          Card.findByIdAndDelete(cardId)
            .then((cardStillExists) => {
              if (cardStillExists) {
                res.status(200).json(card);
              }
              res.status(404).json({ message: 'Карточка не найдена' });
            })
            .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
        }
      })
      .catch(() => res.status(500).json({ message: 'Произошла ошибка' }));
  }
};
