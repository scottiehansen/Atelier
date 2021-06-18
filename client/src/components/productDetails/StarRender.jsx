import React, { useState, useEffect } from 'react';
// import ReactStars from 'react-rating-stars-component';

import axios from 'axios';

function StarRender (props) {

  const [data, setData] = useState(0);
  const [length, setLength] = useState(0);

  // useEffect(() => {
  //   axios.get(`/api/reviews/${props.item.id}`)
  //     .then (response => {
  //       let ratingSum = 0;
  //       let reviewArray = response.data.results;
  //       for (var i = 0; i < reviewArray.length; i++) {
  //         ratingSum += reviewArray[i].rating
  //       };
  //       setLength(reviewArray.length);
  //       let averageRating = ratingSum/reviewArray.length;
  //       setData(averageRating);
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <div>
    {/* <ReactStars
      count={5}
      isHalf={true}
      value={data}
      size={15}
      edit={false}
      activeColor='#ffd700'
    />{length} reviews */}
    </div>
  )
}

export default StarRender;