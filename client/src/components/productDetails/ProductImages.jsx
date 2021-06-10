import React, { useState, useEffect } from 'react';

function ProductImages (props) {

  return (
    <div>
      <img src={props.image.thumbnail_url}/>
    </div>
  )
}

export default ProductImages;