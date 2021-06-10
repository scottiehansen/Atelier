import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReviewTiles from "./ReviewTiles.jsx";
import API_KEY from "./config.js";
import Select from 'react-select';

var Reviews = () => {

  // PRODUCT ID IS HARDCODED IN. USE A AXIOS CALL TO GET THEM OR GET THEM FROM THE MAIN STORE IF USING REDUX
  let [productID, makeProductID] = useState(16057)
  let [isPageloading, makeIsPageLoading] = useState(true);
  let [reviews, makeReviews] = useState([]);
  let [numberOfReviews, makeNumberOfReviews] = useState(2);
  let [reviewSorter, makeReviewSorter] = useState({value: 'Relevance', label: 'Relevance'});
  let [reviewsSortedByHelpfulness, makeReviewsSortedByHelpfulness] = useState([]);
  let [reviewsSortedByRelevance, makeReviewsSortedByRelevance] = useState([]);
  let [reviewsSortedByDate, makeReviewsSortedByDate] = useState([]);

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
      .then(response => {
        // do initial review sorting here
        let sortedReviewsHelpfulness = sortReviewsByHelpfulness(response.data.results);
        let sortedReviewsDate = sortReviewsByDate(response.data.results)
        makeReviewsSortedByHelpfulness(sortedReviewsHelpfulness);
        makeReviewsSortedByDate(sortedReviewsDate);
        //let sortedReviewsRelevance = relevantReviewSorter(sortedReviewsHelpfulness, sortedReviewsDate)
        makeReviews(response.data.results);
        makeIsPageLoading(false);
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  // sorting function
  const changeSorting = (value) => {
    if (value.value === 'Newest') {
      // makeReviews(reviewsSortedByHelpfulness);
      makeReviewSorter({value: 'Newest', label: 'Newest'})
    } else if (value.value === 'Helpful') {
      // makeReviews(reviewsSortedByDate);
      makeReviewSorter({value: 'Helpful', label: 'Helpful'})
    } else {
      makeReviewSorter({value: 'Relevance', label: 'Relevance'})
    }
  }

  // rendering componenet

  if (isPageloading) {
    return (
      <div>
        Loading... Please Wait
      </div>
    )
  } else if (reviews.length === 0) {
    return (
      <div>
        <button>Write New Review</button>
      </div>
    )
  } else {
    return (
      <div className='reviewTiles'>
      <div className='SelectBar'>
        < Select options={options} value={reviewSorter} onChange={value => {changeSorting(value)}} />
      </div>
      {/* Shows reviews depending on the current value of the length variable, default is 2 */}
      {reviewSorter.value === 'Relevance' ?
        filterReviewsByLength(reviews, numberOfReviews).map((review, index) => (
          <ReviewTiles review={review} key={index}/>
        )) :
        reviewSorter.value === 'Helpful' ?
          filterReviewsByLength(reviewsSortedByHelpfulness, numberOfReviews).map((review, index) => (
            <ReviewTiles review={review} key={index}/>
          )) :
          filterReviewsByLength(reviewsSortedByDate, numberOfReviews).map((review, index) => (
            <ReviewTiles review={review} key={index}/>
          ))
      }
      {/* {filterReviewsByLength(reviews, numberOfReviews).map((review, index) => (
        <ReviewTiles review={review} key={index}/>
      ))} */}
      {/* This shows a "Click for more reviews" button which will increment the length variable by 2 and show 2 more reviews. If there are no more reviews, the button will disappear*/}
        {reviews.length > numberOfReviews ?
          <button onClick={() => makeNumberOfReviews(numberOfReviews + 2)}>Click for more reviews</button> :
          null
        }
      </div>
    )
  }
}

const sortReviewsByDate = (reviews) => {
  var reviewsCopy = [];
  for (var i = 0; i < reviews.length; i++) {
    reviewsCopy.push({...reviews[i]})
  }
  const compareDate = (a, b) => {
    // Use toUpperCase() to ignore character casing
    let comparison = 0;
    if (a.date > b.date) {
      comparison = 1;
    } else if (a.date < b.date) {
      comparison = -1;
    }
    return comparison;
  }
  reviewsCopy.sort(compareDate);
  reviewsCopy.forEach((element, index) => (
      element.dateRanking = index
  ))
  return (reviewsCopy);
}

const sortReviewsByHelpfulness = (reviews) => {
  var reviewsCopy = [];
  for (var i = 0; i < reviews.length; i++) {
    reviewsCopy.push({...reviews[i]})
  }
  const compareHelpfulness = (a, b) => {
    // Use toUpperCase() to ignore character casing
    let comparison = 0;
    if (a.helpfulness < b.helpfulness) {
      comparison = 1;
    } else if (a.helpfulness > b.helpfulness) {
      comparison = -1;
    }
    return comparison;
  }
  reviewsCopy.sort(compareHelpfulness);
  console.log('reviewsCopy', reviewsCopy);
  reviewsCopy.forEach((element, index) => (
      element.helpfulnessRanking = index
  ))
  return (reviewsCopy);
}

const relevantReviewSorter = (helpfulness, date) => {
  let relevantIds = [];
  const compareIds = (a, b) => {
    // Use toUpperCase() to ignore character casing
    let comparison = 0;
    if (a.review_id > b.review_id) {
      comparison = 1;
    } else if (a.review_id < b.review_id) {
      comparison = -1;
    }
    return comparison;
  }
  const compareRelevance = (a, b) => {
    // Use toUpperCase() to ignore character casing
    let comparison = 0;
    if (a.relevanceRating > b.relevanceRating) {
      comparison = 1;
    } else if (a.relevanceRating < b.relevanceRating) {
      comparison = -1;
    }
    return comparison;
  }
  helpfulness.sort(compareIds);
  date.sort(compareIds);

  helpfulness.forEach((element, index) => {
    let newRating = element.helpfulnessRanking + date[index].dateRanking
    element.relevanceRating = newRating
  })
  console.log('helpfulness', helpfulness);

  helpfulness.sort(compareRelevance);
}

// NOTE:
// This algorithm should be done on the database backend to save time, every time a post request is submitted. That way, it does not have to redo the algorithm each time the page rerenders.
// This is a VERY SIMPLE AND EASY ranking/sorting alogrithm. I will need to fiddle and come up with a mathematical equation for optimization purposes
// E.G. RRS(reviews) = (w1 * reviewHelpfulnessRanking) + (w2 * reviewDateRanking)
// I'm strapped for time, so I am going to do a simple one. RRS(reviews) = reviewHelpfulnessRanking + reviewDateRanking
// For further reading: https://stackoverflow.com/questions/8760570/how-to-provide-most-relevant-results-with-multiple-factor-weighted-sorting
// Spitballing (off the top of my head), this would likely best statistically be optimized on the machine learning end via a Spearmon Rank Correlation assisted algorithm (or some sort of Baysean classification algorithm).
// You would have to input user data likelihoods (likelihood to purchase product, likelihood to star, etc) that you would acquire through a testing data set.

const filterReviewsByLength = (reviews, length) => {
  return reviews.filter((review, index) => (
    index < length
  ))
}

const sorter = (reviews1, reviews2) => {
  console.log(reviews1);
  console.log(reviews2);
}

export default Reviews;


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReviewTiles from "./ReviewTiles.jsx";
// import API_KEY from "./config.js";
// import Select from 'react-select';

// var Reviews = () => {

//   // PRODUCT ID IS HARDCODED IN. USE A AXIOS CALL TO GET THEM OR GET THEM FROM THE MAIN STORE IF USING REDUX
//   let [productID, makeProductID] = useState(16057)
//   let [isPageloading, makeIsPageLoading] = useState(true);
//   let [reviews, makeReviews] = useState([]);
//   let [numberOfReviews, makeNumberOfReviews] = useState(2);
//   let [reviewSorter, makeReviewSorter] = useState({value: 'Relevance', label: 'Relevance'});
//   let [reviewsSortedByHelpfulness, makeReviewsSortedByHelpfulness] = useState([]);
//   let [reviewsSortedByRelevance, makeReviewsSortedByRelevance] = useState([]);
//   let [reviewsSortedByDate, makeReviewsSortedByDate] = useState([]);

//   const options = [
//     { value: 'Relevance', label: 'Relevance' },
//     { value: 'Helpful', label: 'Helpful' },
//     { value: 'Newest', label: 'Newest' }
//   ];

//   // This useEffect is fetching the reviews from a specific product ID. It is then changing the state of the reviews var to include all of the review data.
//   // This will only run on mount
//   useEffect(() => {
//     // Doing inital data load for componenet did mount
//     let config = {
//         headers: {Authorization: API_KEY}
//     }
//     axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${productID}`, config)
//       .then(response => {
//         // do initial review sorting here
//         makeReviews(response.data.results);
//         makeReviewsSortedByHelpfulness(sortReviewsByHelpfulness(response.data.results));
//         makeReviewsSortedByDate(sortReviewsByDate(response.data.results));
//         makeIsPageLoading(false);
//       })
//       .catch(error => {
//         console.log(error)
//       });
//   }, [])

//   // sorting function
//   const changeSorting = (value) => {
//     if (value.value === 'Newest') {
//       makeReviews(reviewsSortedByHelpfulness);
//     } else if (value.value === 'Helpful') {
//       makeReviews(reviewsSortedByDate);
//     }
//   }

//   // rendering componenet

//   if (isPageloading) {
//     return (
//       <div>
//         Loading... Please Wait
//       </div>
//     )
//   } else if (reviews.length === 0) {
//     return (
//       <div>
//         <button>Write New Review</button>
//       </div>
//     )
//   } else {
//     return (
//       <div className='reviewTiles'>
//       <div className='SelectBar'>
//         < Select options={options} defaultValue={reviewSorter} onChange={value => {changeSorting(value)}} />
//       </div>
//       {/* Shows reviews depending on the current value of the length variable, default is 2 */}
//       {filterReviewsByLength(reviews, numberOfReviews).map((review, index) => (
//         <ReviewTiles review={review} key={index}/>
//       ))}
//       {/* This shows a "Click for more reviews" button which will increment the length variable by 2 and show 2 more reviews. If there are no more reviews, the button will disappear*/}
//         {reviews.length > numberOfReviews ?
//           <button onClick={() => makeNumberOfReviews(numberOfReviews + 2)}>Click for more reviews</button> :
//           null
//         }
//       </div>
//     )
//   }
// }

// const sortReviewsByDate = (reviews) => {
//   var reviewsCopy = [];
//   for (var i = 0; i < reviews.length; i++) {
//     reviewsCopy.push({...reviews[i]})
//   }
//   const compareDate = (a, b) => {
//     // Use toUpperCase() to ignore character casing
//     let comparison = 0;
//     if (a.date > b.date) {
//       comparison = 1;
//     } else if (a.date < b.date) {
//       comparison = -1;
//     }
//     return comparison;
//   }
//   reviewsCopy.sort(compareDate);
//   return (reviewsCopy.map((element, index) => (
//     element.dateRanking = index
//   )))
// }

// const sortReviewsByHelpfulness = (reviews) => {
//   var reviewsCopy = [];
//   for (var i = 0; i < reviews.length; i++) {
//     reviewsCopy.push({...reviews[i]})
//   }
//   const compareHelpfulness = (a, b) => {
//     // Use toUpperCase() to ignore character casing
//     let comparison = 0;
//     if (a.helpfulness > b.helpfulness) {
//       comparison = 1;
//     } else if (a.helpfulness < b.helpfulness) {
//       comparison = -1;
//     }
//     return comparison;
//   }

//   return (reviewsCopy.sort(compareHelpfulness));

//   reviewsCopy.forEach((element, index) => (
//     element.helpfulnessRanking = index
//   ))
//   return reviewsCopy;
// }

// // NOTE:
// // This algorithm should be done on the database backend to save time, every time a post request is submitted. That way, it does not have to redo the algorithm each time the page rerenders.
// // This is a VERY SIMPLE AND EASY ranking/sorting alogrithm. I will need to fiddle and come up with a mathematical equation for optimization purposes
// // E.G. RRS(reviews) = (w1 * reviewHelpfulnessRanking) + (w2 * reviewDateRanking)
// // I'm strapped for time, so I am going to do a simple one. RRS(reviews) = reviewHelpfulnessRanking + reviewDateRanking
// // For further reading: https://stackoverflow.com/questions/8760570/how-to-provide-most-relevant-results-with-multiple-factor-weighted-sorting
// // Spitballing (off the top of my head), this would likely best statistically be optimized on the machine learning end via a Spearmon Rank Correlation assisted algorithm (or some sort of Baysean classification algorithm).
// // You would have to input user data likelihoods (likelihood to purchase product, likelihood to star, etc) that you would acquire through a testing data set.

// const filterReviewsByLength = (reviews, length) => {
//   return reviews.filter((review, index) => (
//     index < length
//   ))
// }

// export default Reviews;