import React from 'react';

function Styles (props) {

  return (
    <div>
      <img src={props.style.photos[0].thumbnail_url} />
      {props.style.name}
    </div>
  )
}

export default Styles;