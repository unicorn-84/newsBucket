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
    // cb(null, news);
  }
}

function toParse(data, item, cb) {
  parser.toParseMassMedia(data, item, (error, content) => {
    if (error) {
      cb(error);
      return;
    }
    toSave(content, cb);
  });
}

function toScrape(cb) {
  news = [];
  count = massMedia.length;
  // massMedia.forEach((item) => {
  //   downloader.toDownload(item.url, (error, data) => {
  //     if (error) {
  //       cb(error);
  //       return;
  //     }
  //     toParse(data, item, cb);
  //   });
  // });
  return function (req, res, next) {
    console.log('server');
    next({ name: 'ivan' });
  };
}

module.exports = toScrape;
