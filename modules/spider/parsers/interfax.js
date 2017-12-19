const newsChecker = require('../newsChecker');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.v31__topnews');
    const mainList = mainBlock.find('.v31__psBlock > div > div');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).find('h3').text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), url),
        image: newsChecker.toCheckNews($(this).find('img').first().attr('src'), url),
        section: newsChecker.toCheckNews($(this).find('.topnews__sec').text()),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};

