const fs = require('fs');
const path = require('path');
const downloader = require('./downloader');
const parser = require('./parser');

const massMedia = [
  {
    name: 'ria',
    brand: 'РИА Новости',
    url: 'https://ria.ru',
  },
  {
    name: 'tass',
    brand: 'ТАСС',
    url: 'https://tass.ru',
  },
  {
    name: 'regnum',
    brand: 'REGNUM',
    url: 'https://regnum.ru',
  },
  {
    name: 'interfax',
    brand: 'Интерфакс',
    url: 'https://interfax.ru',
  },
  {
    name: 'rosbalt',
    brand: 'РОСБАЛТ',
    url: 'http://rosbalt.ru',
  },
  {
    name: 'korrespondent',
    brand: 'Корреспондент.net',
    url: 'https://korrespondent.net',
  },
  {
    name: 'radioSvoboda',
    brand: 'Радио Свобода',
    url: 'https://svoboda.org',
  },
  {
    name: 'prime',
    brand: 'ПРАЙМ',
    url: 'https://1prime.ru',
  },
  {
    name: 'fontanka',
    brand: 'Фонтанка',
    url: 'http://www.fontanka.ru',
  },
  {
    name: 'rt',
    brand: 'RT',
    url: 'https://russian.rt.com',
  },
];

let completed = 0;
let count = 0;
let news = [];

function toSave(content, cb) {
  news = news.concat(content);
  completed += 1;
  if (completed === count) {
    completed = 0;
    count = 0;
    cb(null, news);
  }
}

function toParse(data, item, cb) {
  parser.toParseMassMedia(data, item, (error, content) => {
    if (error) {
      cb(error);
      return;
    }
    if (content.length === 0) {
      fs.appendFile(path.join(__dirname, '../../logs/error.log'), `[${new Date()}]\n${item.url} not scraping\n\n`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    toSave(content, cb);
  });
}

module.exports.toScrape = (cb) => {
  news = [];
  count = massMedia.length;
  massMedia.forEach((item) => {
    downloader.toDownload(item.url, (error, data) => {
      if (error) {
        cb(error);
        return;
      }
      toParse(data, item, cb);
    });
  });
};
