import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import RatingsBreakdown from "./RatingsBreakdown.jsx";
import ProductsBreakdown from "./ProductsBreakdown.jsx"
import StarRatings from 'react-star-ratings';

var Ratings = (props) => {

  let [averageRating, totalReviews] = sumRatings(props.reviewsMeta.ratings);

  let ratingsFormatted = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }
  // Integer keys in a javascript object are arranged in a numerical order (all other strings are added in which the order they were added/declared), thus I will need to use reverse to put them in the correct order

  formatRatings(props.reviewsMeta.ratings, ratingsFormatted);

  // I am looping through the object array. I am considering changing this to increase readability
  return (
    <div>
      <div>
        {
          props.reviewFilters.length !== 0 ?
            <h4>
              Currently filtering for {props.reviewFilters.map((element, index) => (
              <div key={index}>{`[${element} Star Reviews] `}</div>
              ))}
              <div className='remove_filters' style={{color: "blue"}}
              onMouseEnter={event => {event.target.style.textDecoration = 'underline'; event.target.style.color = 'black'}}
              onMouseLeave={event => {event.target.style.textDecoration = 'none'; event.target.style.color = 'blue'}}
              onClick={() => {props.dispatchReviewFilters({type: 'removeAll'})}}>
                Remove all filters
              </div>
            </h4> :
            null
        }
      </div>
      <h1>
        {averageRating}
      </h1>
      <div>
        <StarRatings
          rating={averageRating}
          starRatedColor="grey"
          starDimension="20px"
          starSpacing="1px"
          numberOfStars={5}
          name='averageRating'
        />
      </div>
      <div>
        {Object.keys(ratingsFormatted).reverse().map((element, index) => (
          <RatingsBreakdown rating={element} amount={ratingsFormatted[element]} totalReviews={totalReviews} dispatchReviewFilters={props.dispatchReviewFilters} key={index} />
        ))}
      </div>
      <div>
        {Math.round((props.reviewsMeta.recommended.true / (props.reviewsMeta.recommended.true + props.reviewsMeta.recommended.false) * 100))}% of users recommend this product.
      </div>
      <div>
        {Object.keys(props.reviewsMeta.characteristics).map((category, index) => (
          <ProductsBreakdown category={category} categoryData={props.reviewsMeta.characteristics[category]} key={index} />
        ))}
      </div>
    </div>
  )
}

// {Object.keys(props.reviewsMeta.ratings).map((element, index) => (
//   <RatingsBreakdown rating={element} amount={props.reviewsMeta.ratings[element]} totalReviews={totalReviews} makeReviewsFilteredByStarCount={props.makeReviewsFilteredByStarCount} key={index} />
// ))}

// test this with mock data
// Returns an array with the average of the reviews as the first element, and the total number of reviews as the second
const sumRatings = (ratings) => {
  var averageRating = 0;
  var length = 0;
  for (var rating in ratings) {
    averageRating += (Number(rating) * Number(ratings[rating]));
    length += Number(ratings[rating]);
  }
  var average = [(Math.round((averageRating/length) * 10) / 10), length]
  return average;
}

const formatRatings = (ratings, ratingsFormatted) => {
  for (var rating in ratingsFormatted) {
    if (ratings[rating] !== undefined) {
      ratingsFormatted[rating] = Number(ratings[rating])
    }
  }
}

export default Ratings;