const router = require('express').Router();
const path = require('path');
const fs = require('fs');

let users = [];

try {
  users = JSON.parse(fs.readFileSync(path.join('data', 'users.json'), { encoding: 'utf8' }));
} catch (err) {
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
  fs.appendFileSync(path.join('logs', 'error.log'), String(err).concat('\n'));
}

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const user = users.find((el) => {
    const { _id: id } = el;
    return id === req.params.id;
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
