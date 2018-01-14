const newsChecker = require('../newsChecker');

const prop = {
  brand: 'РОСБАЛТ',
  color: '#438b57',
};

function toReplace(elem) {
  if (/_w33_/.test(elem)) {
    return elem.replace('_w33_', '_w650_');
  }
  return '';
}

exports.toParse = ($, item, cb) => {
  const news = [];
  try {
    const mainBlock = $('#wrowblock-3125_57');
    const mainList = mainBlock.find('.media-block').filter(i => i <= 4);
    mainList.each(function toGetNews() {
      news.push({
        id: Math.floor((Math.random() * 100) + 1),
        brand: prop.brand,
        url: item[1],
        color: prop.color,
        title: newsChecker.toCheckNews($(this).find('.title').first().text()),
        link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item[1]),
        image: toReplace(newsChecker.toCheckNews($(this).find('img').first().attr('data-src'))),
      });
    });
  } catch (error) {
    cb(error);
  }
  cb(null, news);
};
