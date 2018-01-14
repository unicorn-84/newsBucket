const newsChecker = require('../newsChecker');

const prop = {
  brand: 'Интерфакс',
  color: '#009B80',
};

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.v31__topnews');
    const mainList = mainBlock.find('.v31__psBlock > div > div');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand: prop.brand,
        url: item[1],
        color: prop.color,
        title: newsChecker.toCheckNews($(this).find('h3').text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item[1]),
        image: newsChecker.toCheckNews($(this).find('img').first().attr('src'), item[1]),
        section: newsChecker.toCheckNews($(this).find('.topnews__sec').text()),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};

