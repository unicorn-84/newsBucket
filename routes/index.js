const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
  response.send('Hello');
  response.render('index', { massMedia: request.specialData });
});

module.exports = router;
