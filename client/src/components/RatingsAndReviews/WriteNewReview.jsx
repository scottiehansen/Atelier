import React from 'react';
import { useState } from 'react';
import WriteNewReviewWindow from './WriteNewReviewWindow.jsx'

var WriteNewReview = (props) => {

  let [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <button className='functional-btn' onClick={() => {setModalShow(true)}}>Write New Review</button>
      <WriteNewReviewWindow show={modalShow} onHide={() => setModalShow(false)} productName={props.productName} />
    </div>
  )
}

export default WriteNewReview;
