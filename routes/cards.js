const router = require('express').Router();
const path = require('path');
const fs = require('fs');

let cards = [];

try {
  cards = JSON.parse(fs.readFileSync(path.join('data', 'cards.json'), { encoding: 'utf8' }));
} catch (err) {
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
  fs.appendFileSync(path.join('logs', 'error.log'), String(err).concat('\n'));
}

router.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = router;
