import React from 'react';
import { useState } from 'react';
import WriteNewReviewWindow from './WriteNewReviewWindow.jsx'

var WriteNewReview = () => {

  let [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <button className='functional-btn' onClick={() => {setModalShow(true)}}>Write New Review</button>
      <WriteNewReviewWindow show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}

export default WriteNewReview;
