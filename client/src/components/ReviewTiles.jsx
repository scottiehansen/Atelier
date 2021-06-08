import React from 'React';
import StarRatings from '../../../node_modules/react-star-ratings';

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
        {reviews.review.date}
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
      <div className='review_response' >
        {reviews.review.response ?
        `Response from Seller : ${reviews.review.response}` :
        null}
      </div>
      <div className='review_response'>
        {reviews.review.response ?
        `Response from Seller : ${reviews.review.response}` :
        ''}
      </div>
      <div className='review_helpfulness'>
        Was this helpful? Yes ({reviews.review.helpfulness})
      </div>
    </div>
  )
}

export default ReviewTiles;