const newsChecker = require('../newsChecker');
const log = require('../../../libs/log')(module);

const prop = {
  brand: 'Фонтанка',
  color: '#ee8d39',
};

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.widget6');
    const mainList = mainBlock.find('.entry');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand: prop.brand,
        url: item[1],
        color: prop.color,
        title: newsChecker.toCheckNews($(this).find('.entry_title').first().text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item[1]),
        image: newsChecker.toCheckNews($(this).find('img').first().attr('src')),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
