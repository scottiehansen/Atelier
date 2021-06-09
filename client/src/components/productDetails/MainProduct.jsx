import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductFeatures from './ProductFeatures.jsx';
const key = require('/client/src/config/config.js');
import ProductImages from './ProductImages.jsx';

function MainProduct (props) {
  const [item, setItem] = useState({});
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState('');

  useEffect(() => {
    setItem(props.item);
    const config = {
      headers: {Authorization: `${key.API_KEY}`}
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${props.item.id}`, config)
      .then(response => {
        setFeatures(response.data.features);
      })
      .catch(error => {console.log(error)})
  })

  return (
    <div>
      <ProductImages item={props.item}/>
      <h1>{item.name}</h1>
      <h3>$ {item.default_price}</h3>
      <h4>category: {item.category}</h4>
      <p>description: {item.description}</p>
      {features.map((feature, index) => <ProductFeatures feature={feature} key={index} />)}
    </div>
  )
}

export default MainProduct;

// {item.features.map((feature, index) => <ProductFeatures feature={feature} key={index}/> )}