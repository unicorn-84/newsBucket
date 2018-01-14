const downloader = require('./downloader');
const parser = require('./parser');

const massMedia = new Map();
massMedia.set('ria', 'https://ria.ru');
massMedia.set('tass', 'https://tass.ru');
massMedia.set('regnum', 'https://regnum.ru');
massMedia.set('interfax', 'https://interfax.ru');
massMedia.set('rosbalt', 'http://rosbalt.ru');
massMedia.set('korrespondent', 'https://korrespondent.net');
massMedia.set('radioSvoboda', 'https://svoboda.org');
massMedia.set('prime', 'https://1prime.ru');
massMedia.set('fontanka', 'http://www.fontanka.ru');
massMedia.set('rt', 'https://russian.rt.com');

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
  count = massMedia.size;
  for (const entry of massMedia) {
    downloader.toDownload(entry[1], (error, data) => {
      if (error) {
        cb(error);
        return;
      }
      toParse(data, entry, cb);
    });
  }
};
