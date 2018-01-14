const express = require('express');
const now = require('performance-now');
const log = require('../libs/log')(module);
const spider = require('../modules/spider');

const router = express.Router();

let startTimer;
let endTimer;

/* GET home page. */
router.get('/', (req, res, next) => {
  startTimer = now();
  spider.toScrape((error, massMedia) => {
    if (error) {
      log.error(error);
      next(error);
      return;
    }
    massMedia.sort((a, b) => a.id - b.id);
    res.render('index', { massMedia });
    endTimer = now();
    log.info(((startTimer - endTimer) / 1000).toFixed(3));
  });
});

module.exports = router;
