const cheerio = require('cheerio');
const newsChecker = require('../newsChecker');

function toReplace(elem) {
  return elem.replace(/background-image:url\('(.*?)'\);/g, (match, str) => match.replace(match, str));
}

exports.toParseRambler = (data, item, cb) => {
  const news = [];
  let $;
  let mainBlock;
  let children;
  try {
    $ = cheerio.load(data, {
      normalizeWhitespace: true,
    });
    mainBlock = $('._2W2J');
    children = mainBlock.find('._1LaA');
    const tempObj = {
      title: children.find('a._2AvG').first().text(),
      link: children.find('a').first().attr('href'),
      image: children.find('a').first().attr('style'),
    };
    if (newsChecker.toCheckNews(tempObj)) {
      news.push({
        name: item.name,
        brand: item.brand,
        color: item.color,
        url: item.url,
        title: tempObj.title,
        link: tempObj.link,
        image: toReplace(tempObj.image),
      });
    }
  } catch (error) {
    cb(error);
    return;
  }
  cb(null, news);
};
