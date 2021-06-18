import React from "react"
import ReactStars from "react-rating-stars-component"

const Stars = (props) => {

  const starMessage = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great'
  }

  return (
    <div>
      Overall rating:
      <ReactStars
      count={5}
      onChange={(newStarRating) => {props.makeStars(newStarRating)}}
      size={24}
      activeColor="#ffd700"
      />
      {props.stars === null ?
      <div></div> :
      <div>{starMessage[props.stars]}</div>
      }
    </div>
  )
}

export default Stars