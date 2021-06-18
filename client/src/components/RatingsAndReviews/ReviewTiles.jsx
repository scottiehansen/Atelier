import React from 'react';
import StarRatings from '../../../../node_modules/react-star-ratings';
import {useState, useEffect} from 'react';
import moment from 'moment';
import ReviewTilesBody from './ReviewTilesBody.jsx';
import ReviewTilesPhotos from './ReviewTilesPhotos.jsx';
import { Checkmark } from 'react-checkmark'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

var ReviewTiles = (reviews) => {
  return (
    <div className='review'>
      <div className='stars_name_date'>
        <div className='review_star_rating'>
          <StarRatings
            rating={reviews.review.rating}
            starRatedColor="grey"
            numberOfStars={5}
            name='rating'
            starDimension="20px"
            starSpacing="1px"
          />
        </div>
        <div className={'review_reviewer_name' + ' review_date'}>
          {reviews.review.reviewer_name}, {moment(reviews.review.date).format('MMMM DD, YYYY')}
          {/* NOTE, THIS NEEDS TO SUBMIT A GET REQUEST TO THE API TO FIND THIS REVIEWERS EMAIL ADDRESS, BY THEIR USERNAME. IF THE EMAIL ADDRESS IS FOUND AND IS ASSOCIATED WITH A SALE, THEN VERIFIED PURCHASER WILL APPEAR*/}
        </div>
      </div>
      <div className='summary'>
        <h3>{reviews.review.summary.slice(0, 60)}</h3>
      </div>
      <div className='review_body'>
        <ReviewTilesBody body={reviews.review.body} />
      </div>
      <div className='review_photos'>
        {reviews.review.photos.length > 0 ?
          reviews.review.photos.map((element, index) => (
            <ReviewTilesPhotos photo={element} key={index} />
          )) :
          null
        }
      </div>
      <div className='review_recommend'>
        {reviews.review.recommend ?
          '✔  I reccomend this product'
        :
        ''}
      </div>
      {reviews.review.response ?
        <div className='review_response'>
          <div style={{fontWeight: 'bold'}}> Response from Seller: </div>
          <div> {reviews.review.response} </div>
          </div> :
        null
      }
      {/* NOTE, SEE DIRK QUESTION IN SLACK. ALSO, YOU NEED TO FIND A WAY TO TRACK A USER BY A COOKIE, TO SEE IF THEY HAVE SUBMITTED A REVIEW BEFORE. YOU ALSO NEED TO RENDER THESE INTO BUTTONS*/}
      <div className='review_helpfulness'>
        <span>Was this helpful? </span>
        <span
        onMouseEnter={event => {event.target.style.textDecoration = 'underline'}}
        onMouseLeave={event => {event.target.style.textDecoration = 'none'}}>
          Yes
        </span>
        <span> ({reviews.review.helpfulness})</span>
      </div>
      <hr />
    </div>
  )
}

export default ReviewTiles;