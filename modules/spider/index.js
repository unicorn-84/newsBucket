const path = require('path');
const fileReader = require('./fileReader');
const log = require('../../libs/log')(module);
const fileSaver = require('./fileSaver');
const downloader = require('./downloader');
const parser = require('./parser');

let completed = 0;
let count = 0;

function toSave(news, name, callback) {
  let data;
  try {
    data = JSON.stringify(news);
  } catch (err) {
    callback(err);
    return;
  }
  fileSaver.toSaveData(path.join(__dirname, `../../news/${name}.json`), data, (error) => {
    if (error) {
      callback(error);
      return;
    }
    log.debug(`${name} completed`);
    if (++completed === count) {
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
