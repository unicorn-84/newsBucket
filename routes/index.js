const fs = require('fs');
const path = require('path');
const express = require('express');
const log = require('../libs/log')(module);
const spider = require('../modules/spider');

const router = express.Router();

function toWriteNews(callback) {
  let massMedia = [];
  try {
    fs.readdirSync(path.join(__dirname, '../news')).forEach((file) => {
      const data = fs.readFileSync(`${path.join(__dirname, '../news')}/${file}`).toString();
      massMedia = massMedia.concat(JSON.parse(data));
    });
  } catch (err) {
    callback(err);
  }
  massMedia.sort((a, b) => a.id - b.id);
  callback(null, massMedia);
  fs.writeFile(path.join(__dirname, '../news.json'), JSON.stringify(massMedia), (error) => {
    if (error) {
      log.error(error);
    }
  });
}

function toGetNews(callback) {
  spider.toScrape(path.join(__dirname, '../mass-media.json'), (error) => {
    if (error) {
      callback(error);
      return;
    }
    log.debug('finished');
    toWriteNews(callback);
  });
}

/* GET home page. */
router.get('/', (req, res, next) => {
// Temporary
  toGetNews((error, massMedia) => {
    if (error) {
      log.error(error);
      next(error);
      return;
    }
    res.render('index', { massMedia });
  });
});

module.exports = router;
