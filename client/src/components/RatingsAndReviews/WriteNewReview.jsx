import React from 'react';
import { useState } from 'react';
import WriteNewReviewWindow from './WriteNewReviewWindow.jsx'

var WriteNewReview = () => {

  let [showWindow, changeShowWindow] = useState(false);

  return (
    <div>
      <button onClick={() => {changeShowWindow(true)}}>Write New Review</button>
      <WriteNewReviewWindow showWindow={showWindow} changeShowWindow={changeShowWindow} />
    </div>
  )
}

export default WriteNewReview;