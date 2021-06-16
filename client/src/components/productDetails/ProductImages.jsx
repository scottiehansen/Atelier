import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

function ProductImages (props) {
  return (
    <SwiperSlide className='sub_images_list'>
      <img className='sub_images' onClick={() => props.onClick(props.index)} index={props.index} src={props.image.thumbnail_url}/>
    </SwiperSlide>
  )
}

export default ProductImages;