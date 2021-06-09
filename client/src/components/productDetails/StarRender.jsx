import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';

import axios from 'axios';

function StarRender (props) {

  const [data, setData] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    console.log(props.item.id)
    axios.get(`/api/reviews/${props.item.id}`)
      .then (response => {
        console.log('response.data.results:', response.data.results)
        let ratingSum = 0;
        let reviewArray = response.data.results;
        for (var i = 0; i < reviewArray.length; i++) {
          ratingSum += reviewArray[i].rating
        };
        setLength(reviewArray.length);
        let averageRating = ratingSum/reviewArray.length;
        setData(averageRating);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>{data}
    <ReactStars
      count={5}
      isHalf={true}
      value={data}
      size={15}
      edit={false}
      activeColor='#ffd700'
    />{length} reviews
    </div>
  )
}

export default StarRender;