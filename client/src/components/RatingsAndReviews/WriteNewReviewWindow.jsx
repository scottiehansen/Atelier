import React from 'react';
import {useState, useReducer} from 'react';
import Recommendation from './WriteNewReviewWindowComponents/Recommendation.jsx'
import Characteristics from './WriteNewReviewWindowComponents/Characteristics.jsx'

// YOU NEED TO PASS THE PRODUCT NAME DOWN AS A PROP TO THIS FUNCTION FROM THE APP FUNCTION

const WriteNewReviewWindow = (props) => {
  let [productRecommendation, changeProductRecommendation] = useState(null) // or no value
  let [productCharacteristics, makeProductCharacteristics] = useState({Size: null, Width: null, Comfort: null, Quality: null, Length: null, productFit: null})

  if (props.showWindow) {
    return (
      <div>
        <form onSubmit={() => props.changeShowWindow(false)}>
          <h1>Write Your Review</h1>
          <h3>PLACEHOLDER PRODUCT NAME </h3>
          <div>Placeholder for stars component </div>
          <Recommendation productRecommendation={productRecommendation} changeProductRecommendation = {changeProductRecommendation} />
          <Characteristics productCharacteristics={productCharacteristics} makeProductCharacteristics = {makeProductCharacteristics} />
          <label>
            PLACEHOLDER LABEL:
            <textarea/>
          </label>
          <input type="submit" value="Submit Review" />
        </form>
      </div>
    )
  } else {
    return (
    <div>
    </div>
    )
  }
};

export default WriteNewReviewWindow;