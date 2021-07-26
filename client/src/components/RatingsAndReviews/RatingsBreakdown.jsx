import React from "react";
import { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

var RatingsBreakdown = (props) => {

  let [clicked, makeClicked] = useState(false);

  const handleRatingClick = () => {
    if (clicked) {
      props.dispatchReviewFilters({type: 'remove', 'reviewNumber': Number(props.rating)})
    } else {
      props.dispatchReviewFilters({type: 'add', 'reviewNumber': Number(props.rating)})
    }
    makeClicked(!clicked);
  }

  return (
    <div>
      <div onClick={handleRatingClick}>
        {props.rating} Stars:
      </div>
      <ProgressBar striped variant="success" now={(props.amount/props.totalReviews) * 100} style={{width: '100%'}} />
    </div>
  )
}


export default RatingsBreakdown;