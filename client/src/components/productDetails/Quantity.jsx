import React from 'react';

function Quantity (props) {
  console.log(props);

  return (
    <option>{props.number}</option>
  )
}

export default Quantity;