import React from "react";

const Summary = (props) => {

  const handleReviewSummary = (event) => {
    if (event.target.value.length <= 60) {
      props.makeReviewSummary(event.target.value);
    }
  }

  const handleReviewBody = (event) => {
    if (event.target.value.length <= 1000) {
      props.makeReviewBody(event.target.value);
    }
  }



  return (
    <div>
      <div>
        <label>Please write a short summary of your review for this product: </label>
        <div>
          <textarea placeholder='Example: Best purchase ever!'  value={props.reviewSummary} onChange={handleReviewSummary}/>
        </div>
      </div>
      <div>
        <label>Please write a review for this product </label>
        {props.reviewBody.length < 50 ?
          <div>
            <textarea placeholder='Why did you like the product or not?' value={props.reviewBody} onChange={handleReviewBody}/>
              <div>
              Minimum required characters left: [{50 - props.reviewBody.length}]
              </div>
          </div> :
          <div>
            <textarea placeholder='Why did you like the product or not?' value={props.reviewBody} onChange={handleReviewBody}/>
            <div>
              Minimum reached
            </div>
          </div>
        }
      </div>
    </div>
  )

}

export default Summary;