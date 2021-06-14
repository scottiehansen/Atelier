import React from 'react';

function Styles (props) {

  return (
    <div className='styles'>
      <img className='styles' onClick={() => props.onClick(props.index)} src={props.style.photos[0].thumbnail_url} />
      {props.style.name}
    </div>
  )
}

export default Styles;