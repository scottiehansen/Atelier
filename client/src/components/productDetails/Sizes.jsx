import React, { useState, useEffect } from 'react';

function Sizes (props) {

  return (
    <option index={props.index}>{props.size}</option>
  )
}

export default Sizes;