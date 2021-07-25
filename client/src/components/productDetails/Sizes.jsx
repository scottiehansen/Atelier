import React, { useState, useEffect } from 'react';

export default function Sizes (props) {

  return (
    <option index={props.index}>{props.size}</option>
  )
}
