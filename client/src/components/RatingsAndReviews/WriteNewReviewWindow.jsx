import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
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
  let [submittedReview, makeSubmittedReview] = useState(false);

  // useEffect(() => {
  //   if (submittedReview === true) {
  //   }
  // }, submittedReview)

  const areAnyFieldsIncorrect = () => {
    let hooks = {'Star rating': stars, 'Product recommendation' : productRecommendation, 'Product characteristics' : productCharacteristics, 'Review summary': reviewSummary, 'Review body' : reviewBody, 'User nickname': nickname, 'Email address': email};
    let warningMessage = 'You must enter the following:\n';
    let fieldMissing = false;
    for (var key in hooks) {
      if (key === 'Review body' && hooks[key].length < 50) {
        fieldMissing = true
        warningMessage += `${key} that is at least 50 characters\n`
      }
      else if (key === 'Email address') {
        let emailSplit = hooks[key].split('@');
        if (emailSplit.length === 1 || emailSplit[1].includes('.') === false) {
          fieldMissing = true;
          warningMessage += `${key} that is in a correct format\n`
        }
      } else if (key === 'Product characteristics') {
        for (var characteristic in productCharacteristics) {
          if (productCharacteristics[characteristic] === null) {
            fieldMissing = true
            warningMessage += `${key}\n`
            break;
          }
        }
      }
      else if (hooks[key] === '' || hooks[key] === null) {
        fieldMissing = true
        warningMessage += `${key}\n`
      }
    }
    return {fieldMissing, warningMessage}
  }

  const handleReviewSubmission = (event) => {
    event.preventDefault();
    let missingFields = areAnyFieldsIncorrect();
    if (missingFields.fieldMissing === true) {
      alert(missingFields.warningMessage)
    } else {
      alert('Your product review has been submitted. Thank you!')
      props.changeShowWindow(false)
    }
  }

  if (props.show) {
    return (
      <div>
        <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Write New Review
             </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleReviewSubmission}>
              <h3>{props.productName}</h3>
              <Stars stars={stars} makeStars={makeStars}/>
              <Recommendation productRecommendation={productRecommendation} changeProductRecommendation = {changeProductRecommendation} />
              <Characteristics productCharacteristics={productCharacteristics} makeProductCharacteristics = {makeProductCharacteristics} />
              <Summary reviewSummary = {reviewSummary} reviewBody = {reviewBody} makeReviewSummary = {makeReviewSummary} makeReviewBody={makeReviewBody} />
              <Photos photoURLs={photoURLs} makePhotoURLs ={makePhotoURLs} photoURL={photoURL} makePhotoURL={makePhotoURL} />
              <UserInfo nickname={nickname} makeNickname={makeNickname} email={email} makeEmail = {makeEmail} />
              <input type="submit" value="Submit Review" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
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


// Notes below:
// IF YOU WANT TO USE HOOKS. DO THE FOLLOWING FORMAT
  // let [warning, makeWarning] = useState({'productRecommendation': null, 'productCharacteristics': null, 'reviewSummary': null, 'reviewBody': null, 'photoURLs': null, 'nickname': null, 'email': null, 'stars': null })
  // useEffect(() => {
  //   productReccomendations
  // }, [productRecommendation, productCharacteristics, reviewSummary, reviewBody, photoURLs, nickname, email, stars])
  // tech debt, i still do not know how to check for incorrect photos