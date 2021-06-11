import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import ReviewTiles from "./ReviewTiles.jsx";
import API_KEY from "./config.js";
import Select from 'react-select';
import reviewHelpers from './ReviewsHelperFunctions.jsx';
import Ratings from './Ratings';

// NOTE:
// I am importing the response from axios and sifting them into seperate arrays. This will take more of a page loading time, but the app will work much faster after
// the initial page load, because the data will have already been sorted. Granted, when a put request is added, I am going to have to resort everything.

var Reviews = () => {

  // PRODUCT ID IS HARDCODED IN. USE A AXIOS CALL TO GET THEM OR GET THEM FROM THE MAIN STORE IF USING REDUX
  let [productID, makeProductID] = useState(16057)
  let [isPageloading, makeIsPageLoading] = useState(true);
  let [numberOfReviews, makeNumberOfReviews] = useState(2);
  let [reviewSorter, makeReviewSorter] = useState({value: 'Relevance', label: 'Relevance'});
  let [reviewsSortedByHelpfulness, makeReviewsSortedByHelpfulness] = useState([]);
  let [reviewsSortedByRelevance, makeReviewsSortedByRelevance] = useState([]);
  let [reviewsSortedByDate, makeReviewsSortedByDate] = useState([]);
  let [reviewsMeta, makeReviewsMeta] = useState({});

    // note the filter function will be looking for characters that are NOT IN THE ARRAY
  let [reviewFilters, dispatchReviewFilters] = useReducer((state=[], action) => {
    switch(action.type) {
      case 'add':
        return [...state, action.reviewNumber]
      case 'remove':
        return [...state].filter(element => element !== action.reviewNumber)
      case 'removeAll':
        return []
      default:
        return state;
    }
  }, []);

  const filterFunction = (reviews, reviewFilter) => {
    if (reviewFilter.length === 0) {
      return reviews;
    } else {
      return reviews.filter(review => (
        reviewFilter.includes(review.rating)
      ))
    }
  };


  const options = [
    { value: 'Relevance', label: 'Relevance' },
    { value: 'Helpful', label: 'Helpful' },
    { value: 'Newest', label: 'Newest' }
  ];

  // This useEffect is fetching the reviews from a specific product ID. It is then changing the state of the reviews var to include all of the review data.
  // This will only run on mount
  useEffect(() => {
    // Doing inital data load for componenet did mount
    let config = {
        headers: {Authorization: API_KEY}
    }
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${productID}`, config)
      .then(responseReviews => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta?product_id=${productID}`, config)
          .then(responseReviewsMeta => {
            makeReviewsMeta(responseReviewsMeta.data)
            makeReviewsSortedByHelpfulness(reviewHelpers.sortReviewsByHelpfulness(responseReviews.data.results));
            makeReviewsSortedByDate(reviewHelpers.sortReviewsByDate(responseReviews.data.results));
            let sortedReviewsHelpfulness = reviewHelpers.sortReviewsByHelpfulness(responseReviews.data.results);
            let sortedReviewsDate = reviewHelpers.sortReviewsByDate(responseReviews.data.results);
            let sortedReviewsRelevance = reviewHelpers.relevantReviewSorter(sortedReviewsHelpfulness, sortedReviewsDate);
            makeReviewsSortedByRelevance(sortedReviewsRelevance);
            makeIsPageLoading(false);
          })
          .catch(errorTwo => {
            console.log('errorTwo: ', errorTwo)
          });
      })
      .catch(errorOne => {
        console.log('errorOne: ', errorOne)
      });
  }, [])

  // sorting function
  const changeSorting = (value) => {
    if (value.value === 'Newest') {
      makeReviewSorter({value: 'Newest', label: 'Newest'})
    } else if (value.value === 'Helpful') {
      makeReviewSorter({value: 'Helpful', label: 'Helpful'})
    } else {
      makeReviewSorter({value: 'Relevance', label: 'Relevance'})
    }
  }

  // rendering componenet

  if (isPageloading) {
    return (
      <div>
        {console.log('render')}
        Loading... Please Wait
      </div>
    )
  } else if (reviewsSortedByRelevance.length === 0) {
    return (
      <div>
        {console.log('render')}
        <button>Write New Review</button>
      </div>
    )
  } else {
    return (
      <div className='reviewTiles'>
      {console.log('render')}
      <Ratings reviewsMeta={reviewsMeta} dispatchReviewFilters={dispatchReviewFilters} />
      <div className='SelectBar'>
        < Select options={options} value={reviewSorter} onChange={value => {changeSorting(value)}} />
      </div>
      {/* Shows reviews depending on the current value of the length variable, default is 2 */}
      {reviewSorter.value === 'Relevance' ?
        filterFunction(reviewsSortedByRelevance, reviewFilters)
        .filter((element, index) => (
          index < numberOfReviews
        ))
        .map((review, index) => (
          <ReviewTiles review={review} key={index}/>
        )) :
        reviewSorter.value === 'Helpful' ?
          reviewsSortedByHelpfulness
          .filter((element, index) => (
            index < numberOfReviews
          ))
          .map((review, index) => (
            <ReviewTiles review={review} key={index}/>
          )) :
          reviewHelpers.filterReviewsByLength(reviewsSortedByDate, numberOfReviews).map((review, index) => (
            <ReviewTiles review={review} key={index}/>
          ))
      }
      {/* This shows a "Click for more reviews" button which will increment the length variable by 2 and show 2 more reviews. If there are no more reviews, the button will disappear*/}
        {reviewsSortedByRelevance.length > numberOfReviews ?
          <button onClick={() => makeNumberOfReviews(numberOfReviews + 2)}>Click for more reviews</button> :
          null
        }
      </div>
    )
  }
}

export default Reviews;
