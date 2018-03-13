const database = require('./database');

module.exports = (request, response, next) => {
  database.connectToDb((error, result) => {
    if (error) {
      next(error);
      return;
    }
    let massMedia = [];
    result.forEach((item) => {
      massMedia = massMedia.concat(item.news);
    });
    massMedia.sort((a, b) => a.id - b.id);
    request.specialData = massMedia;
    next();
  });
};
