import React from 'react';
import {useState, useReducer} from 'react';
import Recommendation from './WriteNewReviewWindowComponents/Recommendation.jsx'
import Characteristics from './WriteNewReviewWindowComponents/Characteristics.jsx'
import Summary from './WriteNewReviewWindowComponents/Summary.jsx'
import Photos from './WriteNewReviewWindowComponents/Photos.jsx'

// YOU NEED TO PASS THE PRODUCT NAME DOWN AS A PROP TO THIS FUNCTION FROM THE APP FUNCTION

const WriteNewReviewWindow = (props) => {
  let [productRecommendation, changeProductRecommendation] = useState(null) // or no value
  let [productCharacteristics, makeProductCharacteristics] = useState({Size: null, Width: null, Comfort: null, Quality: null, Length: null, Fit: null})
  let [reviewSummary, makeReviewSummary] = useState('')
  let [reviewBody, makeReviewBody] = useState('')
  let [photoURLs, makePhotoURLs] = useState([])
  let [photoURL, makePhotoURL] = useState('')

  if (props.showWindow) {
    return (
      <div>
        <form onSubmit={() => props.changeShowWindow(false)}>
          <h1>Write Your Review</h1>
          <h3>PLACEHOLDER PRODUCT NAME </h3>
          <div>Placeholder for stars component </div>
          <Recommendation productRecommendation={productRecommendation} changeProductRecommendation = {changeProductRecommendation} />
          <Characteristics productCharacteristics={productCharacteristics} makeProductCharacteristics = {makeProductCharacteristics} />
          <Summary reviewSummary = {reviewSummary} reviewBody = {reviewBody} makeReviewSummary = {makeReviewSummary} makeReviewBody={makeReviewBody} />
          <Photos photoURLs={photoURLs} makePhotoURLs ={makePhotoURLs} photoURL={photoURL} makePhotoURL={makePhotoURL}/>
          <label>
            PLACEHOLDER LABEL:
            <textarea/>
          </label>
          <input type="submit" value="Submit Review" on />
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