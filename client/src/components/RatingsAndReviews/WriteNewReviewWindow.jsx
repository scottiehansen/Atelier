import React from 'react'
import {useState, useReducer} from 'react'
import Recommendation from './WriteNewReviewWindowComponents/Recommendation.jsx'
import Characteristics from './WriteNewReviewWindowComponents/Characteristics.jsx'
import Summary from './WriteNewReviewWindowComponents/Summary.jsx'
import Photos from './WriteNewReviewWindowComponents/Photos.jsx'
import UserInfo from './WriteNewReviewWindowComponents/UserInfo.jsx'
import Stars from './WriteNewReviewWindowComponents/Stars.jsx'

// YOU NEED TO PASS THE PRODUCT NAME DOWN AS A PROP TO THIS FUNCTION FROM THE APP FUNCTION

const WriteNewReviewWindow = (props) => {
  let [productRecommendation, changeProductRecommendation] = useState(null) // or no value
  let [productCharacteristics, makeProductCharacteristics] = useState({Size: null, Width: null, Comfort: null, Quality: null, Length: null, Fit: null})
  let [reviewSummary, makeReviewSummary] = useState('')
  let [reviewBody, makeReviewBody] = useState('')
  let [photoURLs, makePhotoURLs] = useState([])
  let [photoURL, makePhotoURL] = useState('')
  let [nickname, makeNickname] = useState('')
  let [email, makeEmail] = useState('')
  let [stars, makeStars] = useState(null)

  // const checkForManditoryReviews = (props) => {
  // }

  // const handleReviewSubmission = (props) => {
  // }

  if (props.showWindow) {
    return (
      <div>
        <form onSubmit={() => props.changeShowWindow(false)}>
          <h1>Write Your Review</h1>
          <h3>PLACEHOLDER PRODUCT NAME </h3>
          <Stars stars={stars} makeStars={makeStars} />
          <Recommendation productRecommendation={productRecommendation} changeProductRecommendation = {changeProductRecommendation} />
          <Characteristics productCharacteristics={productCharacteristics} makeProductCharacteristics = {makeProductCharacteristics} />
          <Summary reviewSummary = {reviewSummary} reviewBody = {reviewBody} makeReviewSummary = {makeReviewSummary} makeReviewBody={makeReviewBody} />
          <Photos photoURLs={photoURLs} makePhotoURLs ={makePhotoURLs} photoURL={photoURL} makePhotoURL={makePhotoURL} />
          <UserInfo nickname={nickname} makeNickname={makeNickname} email={email} makeEmail = {makeEmail} />
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