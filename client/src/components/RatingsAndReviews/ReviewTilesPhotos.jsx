import React from "react";
import {useState} from "react";

var ReviewTilesPhotos = (props) => {
  if (!props) {
    return null
  } else {
    return (
      <span>
        <img className='review-photo' src={props.photo.url} alt="Photo of Product" />
      </span>
    )
  }
}

export default ReviewTilesPhotos;