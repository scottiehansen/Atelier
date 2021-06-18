import React from 'react';

function ProductFeatures (props) {

  return (
      <p>{props.feature.feature}: {props.feature.value}</p>
  )
}

export default ProductFeatures;