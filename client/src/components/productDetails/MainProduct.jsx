import React, { useState, useEffect } from 'react';

function MainProduct (props) {
  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(props.item)
  })

  return (
    <div>
      <h1>{item.name}</h1>
      <h3>$ {item.default_price}</h3>
      <h4>category: {item.category}</h4>
    </div>
  )
}

export default MainProduct;