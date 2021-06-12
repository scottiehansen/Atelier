import React from "react";
import {useState, useEffect} from 'react';

var ReviewTilesBody = (props) => {
  let [clicked, makeClicked] = useState(false);

  if (props.length > 250 && clicked === false) {
    return (
      <div>
        {props.body.slice(0, 250)}
        <button onClick={() => makeClicked(true)}>Show More</button>
      </div>
    )
  } else {
    return (
      <div>
        {props.body}
      </div>
    )
  }
}

export default ReviewTilesBody;