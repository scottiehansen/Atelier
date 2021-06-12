import React from 'react';

function ProductFeatures (props) {

  return (
    <div>
      <p>{props.feature.feature}: {props.feature.value}</p>
    </div>
  )
}

export default ProductFeatures;