import React from 'react';
import StarRatings from '../../../node_modules/react-star-ratings';
import {useState, useEffect} from 'react';
import moment from 'moment';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

var ReviewTiles = (reviews) => {
  return (
    <div className='review'>
      <div className='review_star_rating'>
        <StarRatings
          rating={reviews.review.rating}
          starRatedColor="grey"
          numberOfStars={5}
          name='rating'
        />
      </div>
      <div className='review_reviewer_name'>
        {reviews.review.reviewer_name}
      </div>
      <div className='review_date'>
        {moment(reviews.review.date).format('MMMM DD, YYYY')}
      </div>
      <div className='review_summary'>
        <h3>{reviews.review.summary}</h3>
      </div>
      <div className='review_body'>
        {reviews.review.body}
      </div>
      <div className='review_recommend'>
        {reviews.review.recommend ?
        '**CHECKMARK** I reccomend this product' :
        ''}
      </div>
      <div className='review_response'>
        {reviews.review.response ?
          <div className='review_response'> Response from Seller : {reviews.review.response} </div> :
          null
        }
      </div>
      <div className='review_helpfulness'>
        Was this helpful? Yes ({reviews.review.helpfulness})
      </div>
    </div>
  )
}

export default ReviewTiles;