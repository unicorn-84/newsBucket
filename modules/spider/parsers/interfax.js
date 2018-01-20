const newsChecker = require('../newsChecker');

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('.v31__topnews');
    const mainList = mainBlock.find('.v31__psBlock > div > div');
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        url: item[1],
        name: item[0],
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

