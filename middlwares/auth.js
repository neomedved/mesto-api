const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');
const devSecret = require('../data/dev-secret');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
    req.user = payload;
    next();
  } catch (err) {
    next(new CustomError(401, 'Необходима авторизация'));
  }
};
