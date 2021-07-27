import React from 'react';

export default function ProductFeatures (props) {
  console.log('productfeatures', props.features)
  return (
    <React.Fragment>
      <h4>Details:</h4>
      {props.features.map((feature, index) => {
        return (
          <p>{feature.feature}: {feature.value}</p>
        )
      })}
    </React.Fragment>
  )
}