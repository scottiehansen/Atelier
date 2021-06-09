import React, { useState, useEffect } from 'react';
const key = require('/client/src/config/config.js');
import axios from 'axios';

function ProductImages (props) {

  const [mainImage, setMainImage] = useState('');
  const [thumbnailImages, setThumbnailImages] = useState([]);

  useEffect (() => {
    console.log(props.item);
    const config = {
      headers: {Authorization: `${key.API_KEY}`}
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
      .then(response => {
        setMainImage(response.data.results[0].photos[0].url);
        setThumbnailImages(response.data.results.photos);
      })
  }, [])

  return (
    <div>
      <img src={mainImage}/>
    </div>
  )
}

export default ProductImages;