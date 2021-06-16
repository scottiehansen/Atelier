import React from "react";

const sorters = {
  sortReviewsByDate: (reviews) => {
    var reviewsCopy = [];
    for (var i = 0; i < reviews.length; i++) {
      reviewsCopy.push({...reviews[i]})
    }
    const compareDate = (a, b) => {
      // Use toUpperCase() to ignore character casing
      let comparison = 0;
      if (a.date < b.date) {
        comparison = 1;
      } else if (a.date > b.date) {
        comparison = -1;
      }
      return comparison;
    }
    reviewsCopy.sort(compareDate);
    reviewsCopy.forEach((element, index) => (
        element.dateRanking = index
    ))
    return (reviewsCopy);
  },

  sortReviewsByHelpfulness: (reviews) => {
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
    reviewsCopy.forEach((element, index) => (
        element.helpfulnessRanking = index
    ))
    return (reviewsCopy);
  },

// NOTE:
// This algorithm should be done on the database backend to save time, every time a post request is submitted. That way, it does not have to redo the algorithm each time the page rerenders.
// This is a VERY SIMPLE AND EASY ranking/sorting alogrithm. I will need to fiddle and come up with a mathematical equation for optimization purposes
// E.G. RRS(reviews) = (w1 * reviewHelpfulnessRanking) + (w2 * reviewDateRanking)
// I'm strapped for time, so I am going to do a simple one. RRS(reviews) = reviewHelpfulnessRanking + reviewDateRanking
// For further reading: https://stackoverflow.com/questions/8760570/how-to-provide-most-relevant-results-with-multiple-factor-weighted-sorting
// Spitballing (off the top of my head), this would likely best statistically be optimized on the machine learning end via a Spearmon Rank Correlation assisted algorithm (or some sort of Baysean classification algorithm).
// You would have to input user data likelihoods (likelihood to purchase product, likelihood to star, etc) that you would acquire through a testing data set.

  relevantReviewSorter: (helpfulness, date) => {
    let relevantIds = [];
    const compareIds = (a, b) => {
      let comparison = 0;
      if (a.review_id > b.review_id) {
        comparison = 1;
      } else if (a.review_id < b.review_id) {
        comparison = -1;
      }
      return comparison;
    }
    const compareRelevance = (a, b) => {
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

    return(helpfulness.sort(compareRelevance));
  },


  filterReviewsByLength: (reviews, length) => {
    return reviews.filter((review, index) => (
      index < length
    ))
  }
}

export default sorters;