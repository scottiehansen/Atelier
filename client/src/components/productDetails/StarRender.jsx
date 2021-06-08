import React, { useState, useEffect } from 'react';

import axios from 'axios';

function StarRender (props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(props.item.id)
    axios.get(`/api/reviews/${props.item.id}`)
      .then (response => {
        console.log(response.data.results)
        let averageRating;
        for (var i = 0; i < response.data.results.length; i++) {

        }
        setData(response.data.results)
        console.log(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>{data[1]}</div>
  )
}

export default StarRender;