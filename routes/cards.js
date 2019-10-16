const router = require('express').Router();
const path = require('path');
const fs = require('fs');

const cards = JSON.parse(fs.readFileSync(path.join('data', 'cards.json'), { encoding: 'utf8' }));

router.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = router;
