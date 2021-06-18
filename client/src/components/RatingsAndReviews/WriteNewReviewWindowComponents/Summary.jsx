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
      <h5>Write a review headline:</h5>
      <div>
        <textarea rows="1" style={{width: '60%'}} placeholder='Example: Best purchase ever!'  value={props.reviewSummary} onChange={handleReviewSummary}/>
      </div>
      <hr/>
      <h5>Write a product review:</h5>
      <div>
        {props.reviewBody.length < 50 ?
          <div>
            <textarea rows="5" style={{width:'100%'}} placeholder='Why did you like the product or not?' value={props.reviewBody} onChange={handleReviewBody}/>
            <div>
              Minimum required characters left: [{50 - props.reviewBody.length}]
            </div>
          </div> :
          <div>
            <textarea rows="5" style={{width:'100%'}} placeholder='Why did you like the product or not?' value={props.reviewBody} onChange={handleReviewBody}/>
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