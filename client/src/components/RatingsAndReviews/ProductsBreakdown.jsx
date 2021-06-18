import React from "react";
import ProgressBar from 'react-bootstrap/progressbar';

var ProductsBreakdown = (props) => {

  let labels = {
    Size :
    ['Too Small', 'Perfect', 'Too Large'],
    Width :
    ['Too Narrow', 'Perfect', 'Too Wide'],
    Comfort :
    ['Uncomfortable', 'Okay', 'Snug'],
    Quality :
    ['Poor', 'Okay', 'Perfect'],
    Length :
    ['Too Short', 'Perfect', 'Too Long'],
    Fit :
    ['Too Tight', 'Perfect', 'Too Loose']
  }

  return (
    <div>
      {props.category}
      <ProgressBar striped variant="success" style={{width: '100%'}} />
      <p class="alignleft">{labels[props.category][0]}</p>
      <p class="aligncenter">{labels[props.category][1]}</p>
      <p class="alignright">{labels[props.category][2]}</p>
      {/* <label className='start_rating'>{labels[props.category][0]}</label>
      <label className='middle_rating'>{labels[props.category][1]}</label>
      <label className='end_rating'>{labels[props.category][2]}</label> */}
    </div>
  )
}

export default ProductsBreakdown