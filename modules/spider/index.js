const downloader = require('./downloader');
const parser = require('./parser');

// const massMedia = new Map();
// massMedia.set('ria', 'https://ria.ru');
// massMedia.set('tass', 'https://tass.ru');
// massMedia.set('regnum', 'https://regnum.ru');
// massMedia.set('interfax', 'https://interfax.ru');
// massMedia.set('rosbalt', 'http://rosbalt.ru');
// massMedia.set('korrespondent', 'https://korrespondent.net');
// massMedia.set('radioSvoboda', 'https://svoboda.org');
// massMedia.set('prime', 'https://1prime.ru');
// massMedia.set('fontanka', 'http://www.fontanka.ru');
// massMedia.set('rt', 'https://russian.rt.com');

const smi = [
  // {
  //   name: 'ria',
  //   brand: 'РИА Новости',
  //   url: 'https://ria.ru',
  // },
  // {
  //   name: 'tass',
  //   brand: 'ТАСС',
  //   url: 'https://tass.ru',
  // },
  // {
  //   name: 'regnum',
  //   brand: 'REGNUM',
  //   url: 'https://regnum.ru',
  // },
  // {
  //   name: 'interfax',
  //   brand: 'Интерфакс',
  //   url: 'https://interfax.ru',
  // },
  // {
  //   name: 'rosbalt',
  //   brand: 'РОСБАЛТ',
  //   url: 'http://rosbalt.ru',
  // },
  // {
  //   name: 'korrespondent',
  //   brand: 'Корреспондент.net',
  //   url: 'https://korrespondent.net',
  // },
  // {
  //   name: 'radioSvoboda',
  //   brand: 'Радио Свобода',
  //   url: 'https://svoboda.org',
  // },
  // {
  //   name: 'prime',
  //   brand: 'ПРАЙМ',
  //   url: 'https://1prime.ru',
  // },
  {
    name: 'fontanka',
    brand: 'Фонтанка',
    url: 'http://www.fontanka.ru',
  },
  // {
  //   name: 'rt',
  //   brand: 'RT',
  //   url: 'https://russian.rt.com',
  // },
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
    toSave(content, cb);
  });
}

exports.toScrape = (cb) => {
  news = [];
  // count = massMedia.size;
  count = smi.length;
  smi.forEach((item) => {
    downloader.toDownload(item.url, (error, data) => {
      if (error) {
        cb(error);
        return;
      }
      toParse(data, item, cb);
    });
  });

  /* for (const entry of massMedia) {
    downloader.toDownload(entry[1], (error, data) => {
      if (error) {
        cb(error);
        return;
      }
      toParse(data, entry, cb);
    });
  } */
};
