const spider = require('./spider');

module.exports = (request, response, next) => {
  spider.toScrape((error, massMedia) => {
    if (error) {
      next(error);
    }
    massMedia.sort((a, b) => a.id - b.id);
    request.specialData = massMedia;
    next();
  });
};
