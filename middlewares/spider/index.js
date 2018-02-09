const spider = require('./spider');

module.exports = (request, response, next) => {
  spider.toScrape((error, massMedia) => {
    if (error) {
      next(error);
    }
    request.specialData = massMedia;
    next();
  });
};
