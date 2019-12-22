const jwt = require('jsonwebtoken');
const CustomError = require('../errors/custom-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'ca0c855fe4365d8c59ca3f150ff5da7caf24bc2263594ecfda93b60f0ccbb33f');
    req.user = payload;
    next();
  } catch (err) {
    next(new CustomError(401, 'Необходима авторизация'));
  }
};
