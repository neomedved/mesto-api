const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync(path.join('data', 'users.json'), { encoding: 'utf8' }));

router.get('/users', (req, res) => {
  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const user = users.find(el => el._id === req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = router;
