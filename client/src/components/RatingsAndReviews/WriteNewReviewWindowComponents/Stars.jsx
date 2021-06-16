import React from "react"
import ReactStars from "react-rating-stars-component"

const Stars = (props) => {

  return (
    <div>
      <ReactStars
      count={5}
      onChange={(newStarRating) => {props.makeStars(newStarRating)}}
      size={24}
      activeColor="#ffd700"
      />
    </div>
  )
}

export default Stars