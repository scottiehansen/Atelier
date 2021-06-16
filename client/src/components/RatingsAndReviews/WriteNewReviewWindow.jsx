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
  let [warning, makeWarning] =
  useState({'productRecommendation': null, 'productCharacteristics': null, 'reviewSummary': null, 'reviewBody': null,
  'photoURLs': null, 'nickname': null, 'email': null, 'stars': null })
  let [missingRequirement, makeMissingRequirement] = useState(false)
  let primitiveHooks = {productRecommendation, reviewSummary, reviewBody, nickname, email, stars}


  // tech debt, i still do not know how to check for incorrect photos
  const areAnyFieldsIncorrect = () => {
    let charMissing = false;
    for (var key in primitiveHooks) {
      if (key === 'reviewBody' && primitiveHooks[key].length < 50) {
        charMissing = true
        makeWarning({...warning, [key]: 'A review body that is at least 50 characters'})
        makeWarning({'one key': 'missing'})
        console.log(warning);
      }
      else if (key === 'email') {
        let emailSplit = primitiveHooks[key].split('@');
        if (emailSplit.length === 1 || emailSplit[1].includes('.') === false) {
          makeWarning({...warning, [key]: 'An email address that is in a correct format'})
        } else {
          makeWarning({...warning, [key]: null})
        }
      }
      else if (primitiveHooks[key] === '' || primitiveHooks[key] === null) {
        charMissing = true
        makeWarning({...warning, [key]: `${key}`})
      }
      else (
        makeWarning({...warning, [key]: null})
      )
    }
    for (var key in productCharacteristics) {
      if (productCharacteristics[key] === null) {
        charMissing = true
        makeWarning({...warning, 'productCharacteristics' : 'Product Characteristics'})
        break;
      } else {
        makeWarning({...warning, 'productCharacteristics' : null})
      }
    }
    return charMissing
  }

  const handleReviewSubmission = (event) => {
    event.preventDefault();
    if (areAnyFieldsIncorrect() === true) {
      let warningMessage = 'You must enter the following\n';
      for (var key in warning) {
        if (warning[key] === null) {
          warningMessage += `${warning[key]}\n`
        }
      }
      alert(warningMessage)
    } else {
      alert('correct input')
      props.changeShowWindow(false)
    }
  }

  if (props.showWindow) {
    return (
      <div>
        <form onSubmit={handleReviewSubmission}>
          <h1>Write Your Review</h1>
          {console.log(primitiveHooks)}
          <h3>PLACEHOLDER PRODUCT NAME </h3>
          <Stars stars={stars} makeStars={makeStars} warning={warning} makeWarning={makeWarning}/>
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