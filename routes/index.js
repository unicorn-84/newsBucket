const express = require('express');
const now = require('performance-now');
const spider = require('../modules/spider');

const router = express.Router();

let startTimer;
let endTimer;

/* GET home page. */
router.get('/', (req, res, next) => {
  startTimer = now();
  spider.toScrape((error, massMedia) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    return res.render('index', { massMedia });
  });
});

module.exports = router;
