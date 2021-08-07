import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductFeatures from './ProductFeatures.jsx';
import Styles from './Styles.jsx';
import Sizes from './Sizes.jsx';
import Quantity from './Quantity.jsx';
import ImageDefaultView from './ImageDefaultView.jsx';
import SocialMedia from './SocialMedia.jsx';
import ImageModal from './modals/ImageModal.jsx';
import '/client/dist/style.css';
import "regenerator-runtime/runtime";
import Button from 'react-bootstrap/Button';
const key = require('/server/config/config.js');

export default function MainProduct(props) {
  const [item, setItem] = useState({});
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [availableStyles, setAvailableStyles] = useState([]);
  const [styleId, setStyleId] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [resultIndex, setResultIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Select A Size');
  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [soldOutStatus, setSoldOutStatus] = useState(false);
  const [activeStyle, setActiveStyle] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);


  const getSizesAndQuantities = (object) => {
    let sizesArray = ['Select A Size'];
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
    setSelectedSize('Select A Size');
    setSelectedQuantity(['-']);
    setSizeIndex(0);
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
    if (imageStyleResponse.data.results[index].photos.length <= 1) {
      setImages([{
        "url": "https://media.tenor.com/images/cfc9293db9e7c64b16a0ba0195c167b2/tenor.png"
      }])
    } else {
      setImages(imageStyleResponse.data.results[index].photos);
    }
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
    setActiveStyle(index);
    setSelectedQuantity(['-']);
    setSizeIndex(0);
  }, [props.item.id])


  const handleStyleChange = (index) => {
    const config = {
      headers: { Authorization: key }
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
      .then(response => {
        setImages(response.data.results[index].photos);
        setStyleId(response.data.results[index].style_id);
        setSelectedStyle(response.data.results[index].name);
        setActiveStyle(index);
        if (response.data.results[index].sale_price === null) {
          setOriginalPrice(response.data.results[index].original_price);
          setSalePrice('');
        } else {
          setOriginalPrice(response.data.results[index].original_price);
          setSalePrice(response.data.results[index].sale_price);
        }
        getSizesAndQuantities(response.data.results[index].skus);
        setResultIndex(index);
        setSelectedSize('Select A Size')
      })
  }

  const zoomImage = (e) => {
    setShowImageModal(!showImageModal)
  }

  const changeMainImage = (e, index) => {
    console.log('changeMainImage', e);
    setMainImageIndex(e);
  }

  const handleSizeChange = (e) => {
    setSizeIndex(e.target.selectedIndex);
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
        <div className="price_header">
          <h4 style={{ textDecorationLine: 'line-through' }}>${originalPrice} </h4> <h4 style={{ color: 'red' }}>SALE ${salePrice}</h4>
        </div>
      )
    } else {
      return (
        <h4 className="price_header">${originalPrice}</h4>
      )
    }
  }

  const addToCartButtonRender = () => {
    if (soldOutStatus) {
      return (
        <h3 style={{ color: 'red' }}>SOLD OUT! Sign-up with us to get a notification when it comes back in stock</h3>
      )
    } else {
      return (
        <React.Fragment>
          <div style={{ display: 'inline-block' }}>
            <select className='sel' onChange={handleSizeChange} >
              {sizes.map((size, index) => <Sizes size={size} key={index} index={index} onChange={handleSizeChange} sizeIndex={sizeIndex} />)}
            </select>
            <select className='sel'>
              {selectedQuantity.map((number, index) => <Quantity number={number} key={index} />)}
            </select>
          </div>
          <Button className='addBtn' variant='outline-secondary' size='lg'>Add to Cart</Button>
        </React.Fragment>
      )
    }
  }

  return (
    <div id="product-container">
        <ImageDefaultView imageArray={images} handleImageZoom={zoomImage} changeMainImage={changeMainImage}/>
        <ImageModal showImageModal={showImageModal} show={zoomImage} images={images} mainImageIndex={mainImageIndex}/>
        <div id='col_style'>
          <h4 style={{ marginTop: 10 }}>Category: {item.category}</h4>
          <h1>{item.name}</h1>
          {priceRender()}
          <h5 id='selected_style'>Style > {selectedStyle}</h5>
          <Styles activeStyle={activeStyle} styles={availableStyles} onClick={handleStyleChange}/>
          {addToCartButtonRender()}
          <div className='details'>
            <h4>Work the Runway</h4>
            <p>{item.description}</p>
            <p>Style ID: {styleId}</p>
          </div>
          <div className='details'>
            <ProductFeatures features={features}/>
          </div>
          <SocialMedia />
      </div>
    </div>
  )
}
