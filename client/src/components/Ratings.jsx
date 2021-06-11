import React from "react";
import { useState, useEffect } from "react";
import API_KEY from "./config.js";
import axios from "axios";
import RatingsBreakdown from "./RatingsBreakdown";

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
      <h1>Rating: {averageRating}</h1>
      <div>
      {Object.keys(ratingsFormatted).reverse().map((element, index) => (
        <RatingsBreakdown rating={element} amount={ratingsFormatted[element]} totalReviews={totalReviews} dispatchReviewFilters={props.dispatchReviewFilters} key={index} />
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