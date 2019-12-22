const Card = require('../models/card');
const CustomError = require('../errors/custom-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([{ path: 'likes', model: 'user' }, 'owner'])
    .then((cards) => res.json(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).json(card))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card.findById(cardId)
    .populate([{ path: 'likes', model: 'user' }, 'owner'])
    .then((card) => {
      if (!card) {
        throw new CustomError(404, 'Карточка не найдена');
      } else if (String(card.owner._id) !== userId) {
        throw new CustomError(403, 'Вы не можете удалить эту карточку');
      } else {
        Card.findByIdAndDelete(cardId)
          .then((cardStillExists) => {
            if (cardStillExists) {
              res.json(card);
            }
            throw new Error(404, 'Карточка не найдена');
          })
          .catch(next);
      }
    })
    .catch(next);
};
