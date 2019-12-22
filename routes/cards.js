const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getCards, createCard, deleteCardById } = require('../controllers/cards');


router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCardById);


module.exports = router;
