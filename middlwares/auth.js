const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.jwt, 'ca0c855fe4365d8c59ca3f150ff5da7caf24bc2263594ecfda93b60f0ccbb33f');
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Необходима авторизации' });
  }
};
