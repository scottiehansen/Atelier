import React from 'react';

export default function ProductFeatures (props) {
  return (
    <React.Fragment>
      <h4>Details:</h4>
      {props.features.map((feature, index) => {
        return (
          <p key={index}>{feature.feature}: {feature.value}</p>
        )
      })}
    </React.Fragment>
  )
}