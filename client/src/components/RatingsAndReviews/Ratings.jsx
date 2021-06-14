import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import RatingsBreakdown from "./RatingsBreakdown.jsx";
import ProductsBreakdown from "./ProductsBreakdown.jsx"
import StarRatings from '../../../../node_modules/react-star-ratings';

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
      <h1>
        Rating Breakdown
      </h1>
      <div>
        {
          props.reviewFilters.length !== 0 ?
            <h4>
              Currently filtering for {props.reviewFilters.map(element => (
              <span>{`[${element} Star Reviews] `}</span>
              ))}
              <div className='remove_filters' style={{color: "blue"}} onMouseEnter={event => {event.target.style.textDecoration = 'underline'; event.target.style.color = 'black'}}>Remove all filters</div>
            </h4> :
            null
        }
      </div>
      <div>
        Average User Rating: {averageRating}
      </div>
      <div>
        <StarRatings
          rating={averageRating}
          starRatedColor="grey"
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
          <ProductsBreakdown category={category} key={index} />
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
  return [(Math.round((averageRating/length) * 10) / 10), length]
}

const formatRatings = (ratings, ratingsFormatted) => {
  for (var rating in ratingsFormatted) {
    if (ratings[rating] !== undefined) {
      ratingsFormatted[rating] = Number(ratings[rating])
    }
  }
}

export default Ratings;