import React from "react";
import {useState} from "react";

// style={{ height: 200, width: 200 }}

var ReviewTilesPhotos = (props) => {
  if (!props) {
    return null
  } else {
    return (
      <span>
        <img className='review-photo' src={props.photo.url} alt="Photo of Product" defaultsource={'../../assets/default-image.jpeg'} />
      </span>
    )
  }
}

export default ReviewTilesPhotos;