import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductFeatures from './ProductFeatures.jsx';
const key = require('/client/src/config/config.js');
import ProductImages from './ProductImages.jsx';
import Styles from './Styles.jsx';
import SizeAndQuantity from './SizeAndQuantity';
import "core-js/stable";
import "regenerator-runtime/runtime";

function MainProduct (props) {
  const [item, setItem] = useState({});
  const [features, setFeatures] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [subImages, setSubImages] = useState([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [availableStyles, setAvailableStyles] = useState([]);
  const [styleSKU, setStyleSKU] = useState({});


  useEffect(async (index = 0) => {
    setItem(props.item);
    const config = {
      headers: {Authorization: `${key.API_KEY}`}
    };
    const [featureResponse, imageStyleResponse] = await Promise.all([
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}`, config),
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
    ]);
    setFeatures(featureResponse.data.features);
    console.log(imageStyleResponse.data);
    setMainImage(imageStyleResponse.data.results[index].photos[index].url);
    setSubImages(imageStyleResponse.data.results[index].photos);
    setAvailableStyles(imageStyleResponse.data.results);
    setStyleSKU(imageStyleResponse.data.results[index].skus);
    if (imageStyleResponse.data.results[index].sale_price === null) {
      setOriginalPrice(imageStyleResponse.data.results[0].original_price);
    } else {
      setOriginalPrice(imageStyleResponse.data.results[0].original_price);
      setSalePrice(imageStyleResponse.data.results[0].sale_price);
    }
  }, [])

  const handleImageClick = (index) => {
    const config = {
      headers: {Authorization: `${key.API_KEY}`}
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}/styles`, config)
      .then (response => {
        setMainImage(response.data.results[0].photos[index].url);
      })
  }

  return (
    <div>
      <img src={mainImage} />
      {subImages.map((image, index) => <ProductImages image={image} key={index} index={index} onClick={handleImageClick}/>)}
      <h1>{item.name}</h1>
      <h3>$ {originalPrice} {salePrice}</h3>
      <SizeAndQuantity styleSKU={styleSKU} />
      {availableStyles.map((style, index) => <Styles style={style} key={index} />)}
      <h4>category: {item.category}</h4>
      <p>description: {item.description}</p>
      {features.map((feature, index) => <ProductFeatures feature={feature} key={index} />)}
    </div>
  )
}

export default MainProduct;