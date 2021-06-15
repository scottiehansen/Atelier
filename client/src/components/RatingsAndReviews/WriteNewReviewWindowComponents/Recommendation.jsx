import React from 'react';

const Recommendation = (props) => {

  return (
    <div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="Yes"
            checked={props.productRecommendation === true}
            onChange={() => props.changeProductRecommendation(true)}
          />
          Yes
        </label>
        </div>
        <div className="radio">
        <label>
          <input
            type="radio"
            value="No"
            checked={props.productRecommendation === false}
            onChange={() => props.changeProductRecommendation(false)}
          />
          No
        </label>
      </div>
    </div>
  )

}

export default Recommendation;