const newsChecker = require('../newsChecker');

const prop = {
  brand: 'Радио Свобода',
  color: '#a04702',
};

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.headblock-main');
    const mainList = mainBlock.children('div').not('.main-content__topnews');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand: prop.brand,
        url: item[1],
        color: prop.color,
        title: newsChecker.toCheckNews($(this).find('span').first().text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item[1]),
        image: newsChecker.toCheckNews($(this).find('img').first().attr('src')),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
