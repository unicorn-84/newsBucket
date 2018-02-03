const path = require('path');
const fs = require('fs');
const fileReader = require('./fileReader');
const log = require('../../libs/log');
const fileSaver = require('./fileSaver');
const downloader = require('./downloader');
const parser = require('./parser');

let completed = 0;
let count = 0;
const folder = path.join(__dirname, '../../news');

function toSave(news, name, callback) {
  let data;
  try {
    data = JSON.stringify(news);
  } catch (err) {
    callback(err);
    return;
  }
  fileSaver.toSaveData(`${folder}/${name}.json`, data, (error) => {
    if (error) {
      callback(error);
      return;
    }
    log.debug(`${name} completed`);
    if (++completed === count) {
      completed = 0;
      count = 0;
      log.debug('callback');
      callback(null);
    }
  });
}

function toParse(data, item, callback) {
  parser.toParseMassMedia(data, item, (error, news) => {
    if (error) {
      callback(error);
      return;
    }
    toSave(news, item.name, callback);
  });
}

function toDownload(massMedia, callback) {
  massMedia.forEach((item) => {
    downloader.toDownload(item.baseUrl, (error, data) => {
      if (error) {
        callback(error);
        return;
      }
      toParse(data, item, callback);
    });
  });
}

exports.toScrape = (filename, callback) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  fileReader.toGetData(filename, (error, data) => {
    if (error) {
      callback(error);
      return;
    }
    let massMedia;
    try {
      massMedia = JSON.parse(data);
    } catch (err) {
      callback(err);
      return;
    }
    count = massMedia.length;
    toDownload(massMedia, callback);
  });
};
