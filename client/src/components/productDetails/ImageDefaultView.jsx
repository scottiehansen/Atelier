import React, { useState } from 'react';
import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export default function ImageDefaultView(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  SwiperCore.use([Navigation, Thumbs]);

  return (
    <>
    <div id="col_sideSwiper">
      <div className='swiper-button-prev-unique'></div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={5}
        direction="vertical"
        navigation={
          {
            nextEl: '.swiper-button-next-unique',
            prevEl: '.swiper-button-prev-unique'
          }
        }
        freeMode={true}
        watchSlidesVisibility={true}
        watchSlidesProgress={true}
        className='mySwiper'
      >
        {props.imageArray.map((image, index) =>
          <SwiperSlide key={index}>
            <img className='sub_images' index={index} src={image.thumbnail_url} onClick={props.changeMainImage.bind(this, index)} />
          </SwiperSlide>)}
      </Swiper>
      <div className='swiper-button-next-unique'></div>
    </div>
      <div id='col_image'>
        <Swiper
          spaceBetween={500}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
          observer
          onSlideChange={(Swiper) => { props.changeMainImage(Swiper.activeIndex) }}
        >
          {props.imageArray.map((image, index) =>
            <SwiperSlide key={index} tag='li'>
              <img id='main_image' key={index} src={image.url} onClick={props.handleImageZoom} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  )
}