import React from "react";
import PhotoThumbnails from './PhotoThumbnails.jsx';

const Photos = (props) => {

  // For future reference, you will need to check whether or not the image is in a proepr format
  // handlePhotoUpload = (event) => {
  //   var urlStringSplit = event.target.value.split('.');
  //   var extension = urlStringSplit[urlStringSplit.length - 1];
  //   if (extension.includes('jpg', 'jpeg', 'png')) {
  //     makePhotosType('This is not an allowable image, please submit an image that is either jpg')
  //   }
  //   props.makePhotos([...props.photos, event.target.value])
  // }

  const handlePhotoURLChange = (event) => {
    props.makePhotoURL(event.target.value)
  }

  const handlePhotoURLSubmission = (event) => {
    event.preventDefault()
    props.makePhotoURLs([...props.photoURLs, props.photoURL])
    props.makePhotoURL('')
  }

  return (
    <div>
      {props.photoURLs.map((photo, index) => (
        <PhotoThumbnails photo={photo} key={index} />
      ))}
      {props.photoURLs.length < 5 ?
        <div>
          <input type="text" rows="1" style={{width: '40%'}} value={props.photoURL} onChange={handlePhotoURLChange} />
          <button onClick={handlePhotoURLSubmission}> Submit Product Photo URL </button>
        </div> :
        <div></div>
      }
    </div>
  )
}

export default Photos;