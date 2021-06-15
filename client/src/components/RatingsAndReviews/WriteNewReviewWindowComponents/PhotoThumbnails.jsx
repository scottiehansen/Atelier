import React from 'react'

const PhotoThumbnails = (props) => {
  return (
    <span>
      <img className='review-photo' src={props.photo} alt="Photo of Product" />
    </span>
  )
}

export default PhotoThumbnails;