import React from 'react';
import {useState} from 'react';

// YOU NEED TO PASS THE PRODUCT NAME DOWN AS A PROP TO THIS FUNCTION FROM THE APP FUNCTION

const WriteNewReviewWindow = (props) => {
  let [productRecommendation, changeProductRecommendation] = useState(null) // or no value



  if (props.showWindow) {
    return (
      <div>
        <form onSubmit={() => props.changeShowWindow(false)}>
          <h1>Write Your Review</h1>
          <h3>PLACEHOLDER PRODUCT NAME </h3>
          <div>Placeholder for stars component </div>
          <div onChange={() => changeProductRecommendation(event.target.value)}>
            <label>
              Did you find this product helpful?
            </label>
            <br />
            <input type="radio" value={true} name="Yes" /> Male
            <input type="radio" value={false} name="No" /> Female
          </div>
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