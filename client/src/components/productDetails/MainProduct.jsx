import React, { useState, useEffect } from 'react';

function MainProduct (props) {
  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(props.item)
  })

  return (
    <div>{props.item.name}</div>
  )
}