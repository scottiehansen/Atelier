import React, { useState, useEffect } from 'react';

function ProductImages (props) {
  return (
      <img onClick={() => props.onClick(props.index)} index={props.index} src={props.image.thumbnail_url}/>
  )
}

export default ProductImages;