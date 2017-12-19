const fs = require('fs');
const path = require('path');
const express = require('express');
const log = require('../libs/log')(module);

const router = express.Router();
let massMedia;
fs.readFile(path.join(__dirname, '../news.json'), 'utf8', (error, data) => {
  if (error) {
    log.error(error);
    return;
  }
  massMedia = JSON.parse(data);
});
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { massMedia });
});

module.exports = router;
