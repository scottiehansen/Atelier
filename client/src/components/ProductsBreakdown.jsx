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
      <ProgressBar striped variant="success" style={{width: 500}} />
      {labels[props.category][0]} {labels[props.category][1]} {labels[props.category][2]} NEED TO ALLIGN THESE
    </div>
  )
}

export default ProductsBreakdown