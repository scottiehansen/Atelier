import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductFeatures from './ProductFeatures.jsx';
import ProductImages from './ProductImages.jsx';
import Styles from './Styles.jsx';
import Sizes from './Sizes.jsx';
import Quantity from './Quantity.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs, Zoom } from 'swiper/core';


import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/thumbs/thumbs.min.css";
import "swiper/components/zoom/zoom.min.css"

import '/client/dist/style.css';

SwiperCore.use([Navigation, Thumbs, Zoom]);

import "core-js/stable";
import "regenerator-runtime/runtime";

import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, PinterestShareButton, PinterestIcon } from 'react-share';
import Button from 'react-bootstrap/Button';


const key = require('/server/config/config.js');


function MainProduct(props) {
  const [item, setItem] = useState({});
  const [features, setFeatures] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [availableStyles, setAvailableStyles] = useState([]);
  const [styleId, setStyleId] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [resultIndex, setResultIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Selected Size');
  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const [sizeIndex, setSizeIndex] = useState('');
  const [shoppingCart, setShoppingCart] = useState([]);
  const [imageClickStatus, setImageClickStatus] = useState(false);
  const [soldOutStatus, setSoldOutStatus] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const getSizesAndQuantities = (object) => {
    let sizesArray = ['Select Size'];
    let quantitiesArray = ['-'];
    for (var keys in object) {
      if (object[keys].quantity > 0) {
        sizesArray.push(object[keys].size);
        quantitiesArray.push(object[keys].quantity);
      }
    }
    if (quantitiesArray.length <= 1) {
      setSoldOutStatus(true);
    } else {
      setSoldOutStatus(false);
    }
    setSizes(sizesArray);
    setQuantities(quantitiesArray);
    setSelectedQuantity(quantitiesArray);
  }

  useEffect(async (index = 0) => {
    setItem(props.item);
    const config = {
      headers: { Authorization: key }
    };
    const [featureResponse, imageStyleResponse] = await Promise.all([
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}`, config),
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
    ]);
    setFeatures(featureResponse.data.features);
    setMainImage(imageStyleResponse.data.results[index].photos[index].url);
    setSubImages(imageStyleResponse.data.results[index].photos);
    setAvailableStyles(imageStyleResponse.data.results);
    setSelectedStyle(imageStyleResponse.data.results[index].name);
    setStyleId(imageStyleResponse.data.results[index].style_id);
    if (imageStyleResponse.data.results[index].sale_price === null) {
      setOriginalPrice(imageStyleResponse.data.results[0].original_price);
    } else {
      setOriginalPrice(imageStyleResponse.data.results[0].original_price);
      setSalePrice(imageStyleResponse.data.results[0].sale_price);
    }
    getSizesAndQuantities(imageStyleResponse.data.results[index].skus);
    setSelectedQuantity(['-']);
  }, [props.item.id])

  const handleImageClick = (index) => {
    const config = {
      headers: { Authorization: key }
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
      .then(response => {
        setMainImage(response.data.results[resultIndex].photos[index].url);
        setSubImages(response.data.results[resultIndex].photos);
      })
  }


  const handleStyleChange = (index) => {
    const config = {
      headers: { Authorization: key }
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
      .then(response => {
        setMainImage(response.data.results[index].photos[0].url);
        setSubImages(response.data.results[index].photos);
        setStyleId(response.data.results[index].style_id);
        setSelectedStyle(response.data.results[index].name);
        if (response.data.results[index].sale_price === null) {
          setOriginalPrice(response.data.results[index].original_price);
          setSalePrice('');
        } else {
          setOriginalPrice(response.data.results[index].original_price);
          setSalePrice(response.data.results[index].sale_price);
        }
        getSizesAndQuantities(response.data.results[index].skus);
        setResultIndex(index);
      })
  }

  const handleSizeChange = (e) => {
    let quantity = quantities[e.target.selectedIndex];
    let numberArray = ['-'];
    let i = 1;
    while (i <= quantity && i <= 15) {
      numberArray.push(i);
      i++;
    }
    setSelectedQuantity(numberArray);
  }

  const priceRender = () => {
    if (salePrice !== '') {
      return (
        <div>
          <h3 style={{ textDecorationLine: 'line-through' }}>${originalPrice} </h3> <h3 style={{ color: 'red' }}>SALE ${salePrice}</h3>
        </div>
      )
    } else {
      return (
        <h3>${originalPrice}</h3>
      )
    }
  }

  const handleMainImageClick = () => {
    setImageClickStatus(!imageClickStatus)
  }

  const addToCartButtonRender = () => {
    if (soldOutStatus) {
      return (
        <h3 style={{color: 'red'}}>SORRY, BABY! SOLD OUT</h3>
      )
    } else {
      return (
        <React.Fragment>
          <select className='sel' onChange={handleSizeChange} >
            {sizes.map((size, index) => <Sizes size={size} key={index} index={index} onChange={handleSizeChange} sizeIndex={sizeIndex} />)}
          </select>
          <select className='sel'>
            {selectedQuantity.map((number, index) => <Quantity number={number} key={index} />)}
          </select>
          <Button variant='outline-secondary' size='lg'>Add to Cart</Button>
        </React.Fragment>
      )
    }
  }

  const zoomImageRender = () => {
    if (imageClickStatus === false) {
      return (
        <div id='col_image'>
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="mySwiper2"
          >
            <div className=''>prev</div>
            {subImages.map((image, index) =>
              <SwiperSlide key={index} tag='li'>
                <img id='main_image' key={index} src={image.url} onClick={() => handleMainImageClick()}/>
              </SwiperSlide>
            )}
            <div className=''>next</div>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            slidesPerView={7}
            freeMode={true}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className="mySwiper"
          >
            {subImages.map((image, index) =>
              <SwiperSlide key={index}>
                <img className='sub_images' key={index} src={image.thumbnail_url} onClick={() => handleImageClick(index)} />
              </SwiperSlide>)}
          </Swiper>
        </div>
      )
    } else {
      return (
        <div>
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="mySwiper2"
            zoom={true}
          >
            {subImages.map((image, index) =>
              <SwiperSlide key={index} tag='li'>
                <img id='main_image_expanded' key={index} src={image.url} onClick={() => handleMainImageClick()}/>
              </SwiperSlide>
            )}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            slidesPerView={7}
            freeMode={true}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className="mySwiper"
          >
            {subImages.map((image, index) =>
              <SwiperSlide key={index}>
                <img className='sub_images' key={index} src={image.thumbnail_url} onClick={() => handleImageClick(index)} />
              </SwiperSlide>)}
          </Swiper>
        </div>
      )
    }
  }

  return (
    <div>
      {zoomImageRender()}
      <div id='col_style'>
        <h5>Category: {item.category}</h5>
        <h1>{item.name}</h1>
        {priceRender()}
        <h4>Style > {selectedStyle}</h4>
        <ul id='style_grid'>
          {availableStyles.map((style, index) => <Styles style={style} key={index} index={index} onClick={handleStyleChange} />)}
        </ul>
        {addToCartButtonRender()}
      </div>
      <div className='details'>
        <h5>Work the Runway</h5>
        <p>{item.description}</p>
      </div>
      <div className='details'>
        <p>Style ID: {styleId}</p>
        <h5> Details: </h5>
        {features.map((feature, index) => <ProductFeatures feature={feature} key={index} />)}
      </div>

      <FacebookShareButton url={''}>
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <TwitterShareButton url={''}>
        <TwitterIcon size={30} />
      </TwitterShareButton>
      <PinterestShareButton url={''}>
        <PinterestIcon size={30} />
      </PinterestShareButton>
    </div>
  )
}

export default MainProduct;
{/*
id="main"
          tag="section"
          wrapperTag="ul"
          navigation={true}
          spaceBetween={0}
          slidesPerView={1}
        >
          {subImages.map((image, index) =>
            <SwiperSlide key={index} tag='li'>
              <img id='main_image' key={index} src={image.url} />
            </SwiperSlide>
          )}
        </Swiper>
        <div className='swiper-button-next'>next</div>

        <Swiper
          wrapperTag='ul'
          navigation
          spaceBetween={5}
          slidesPerView={4}
          observer={true}
        >
          {subImages.map((image, index) =>
            <SwiperSlide key={index} tag='li'>
              <img className='sub_images' key={index} src={image.thumbnail_url} onClick={() => handleImageClick(index)} />
            </SwiperSlide>
          )}
        </Swiper> */}

        // let mainImages = [];
        // const renderMainArray = (array) => {
        //   for (let i = 0; i < array.length; i++) {
        //     <SwiperSlide>
        //       <img id='main_image'src={image.url} />
        //     </SwiperSlide>
        //   }
        // }



        // <Swiper
        //   spaceBetween={10}
        //   navigation={true}
        //   thumbs={{ swiper: thumbsSwiper }}
        //   className="mySwiper2"
        // >
        //   {subImages.map((image, index) =>
        //     <SwiperSlide key={index} tag='li'>
        //       <img id='main_image' key={index} src={image.url} onClick={() => handleMainImageClick()} />
        //     </SwiperSlide>
        //   )}
        // </Swiper>
        // <Swiper
        //   onSwiper={setThumbsSwiper}
        //   spaceBetween={10}
        //   slidesPerView={4}
        //   freeMode={true}
        //   watchSlidesVisibility={true}
        //   watchSlidesProgress={true}
        //   className="mySwiper"
        // >
        //   {subImages.map((image, index) =>
        //     <SwiperSlide key={index}>
        //       <img className='sub_images' key={index} src={image.thumbnail_url} onClick={() => handleImageClick(index)} />
        //     </SwiperSlide>)}
        // </Swiper>