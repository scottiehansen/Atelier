import React from 'react';

export default function ProductFeatures (props) {
  return (
      <p>{props.feature.feature}: {props.feature.value}</p>
  )
}