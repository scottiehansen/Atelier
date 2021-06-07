const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router
  .route('/products')
    .get(controllers.getProducts)

router
  .route('/reviews')
    .get(controllers.getReviews)


module.exports = router;