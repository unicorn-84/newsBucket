const newsChecker = require('../newsChecker');

exports.toParse = ($, url, brand, color, cb) => {
  const news = [];
  try {
    const mainBlock = $('.b-index__main-wr');
    const mainNews = mainBlock.find('.b-index__main-news');
    const mainList = mainBlock.find('.b-index__main-list li');
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      brand,
      url,
      color,
      title: newsChecker.toCheckNews(mainNews.find('.b-index__main-news-title').text()),
      link: newsChecker.toCheckNews(mainNews.find('a').first().attr('href'), url),
      image: newsChecker.toCheckNews(mainNews.find('img').first().attr('src')),
      section: newsChecker.toCheckNews(mainNews.find('.b-index__main-news-rubric').text()),
    });
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand,
        url,
        color,
        title: newsChecker.toCheckNews($(this).text()),
        link: newsChecker.toCheckNews($(this).find('a').attr('href'), url),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
