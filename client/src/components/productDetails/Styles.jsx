import React from 'react';

export default function Styles (props) {

  return (
    <ul id='style_grid'>
      {props.styles.map((style, index) => {
        return (
          <li className={props.activeStyle === index ? 'active_style' : null} key={index}>
            <img className='styles' onClick={() => props.onClick(index)} src={style.photos[0].thumbnail_url} />
          </li>
        )
      })}
    </ul>
  )

}