const express = require('express');
const router = express.Router();
const controllers = require('./controllers.js');

router
  .route('/products')
    .get(controllers.getProducts)

router
  .route('/reviews/:id')
    .get(controllers.getReviews)

router
  .route('/reviews')
    .get(controllers.getReviewsById)


module.exports = router;