const fs = require('fs');
const path = require('path');
const express = require('express');
const log = require('../libs/log')(module);
const spider = require('../modules/spider');

const router = express.Router();

function toWriteNews(callback) {
  const folder = './news';
  let massMedia = [];
  try {
    fs.readdirSync(folder).forEach((file) => {
      const data = fs.readFileSync(`${folder}/${file}`).toString();
      const item = data.replace(/\\n/g, '').replace(/\\t/g, '').replace(/ {2,}/g, '');
      massMedia = massMedia.concat(JSON.parse(item));
    });
  } catch (err) {
    callback(err);
  }
  massMedia.sort((a, b) => a.id - b.id);
  callback(null, massMedia);
  fs.writeFile('./news.json', JSON.stringify(massMedia), (error) => {
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
      return;
    }
    res.render('index', { massMedia });
  });
});

module.exports = router;
