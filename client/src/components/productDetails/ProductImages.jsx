import React, { useState, useEffect } from 'react';

function ProductImages (props) {
  return (
    <li className='sub_images_list'>
      <img className='sub_images' onClick={() => props.onClick(props.index)} index={props.index} src={props.image.thumbnail_url}/>
    </li>
  )
}

export default ProductImages;