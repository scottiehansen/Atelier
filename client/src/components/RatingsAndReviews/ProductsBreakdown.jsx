import React from "react";
import ProgressBar from 'react-bootstrap/progressbar';
import { CaretDownFill } from 'react-bootstrap-icons';

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
      <div className="rating_characteristics">
        {/* <CaretDownFill className="caret" size={30}/> */}
        <ProgressBar className="bar" striped variant="success" now={(props.categoryData.value/5) * 100} style={{width: '100%', position:'relative'}} />
      </div>
      <p className="alignleft">{labels[props.category][0]}</p>
      <p className="aligncenter">{labels[props.category][1]}</p>
      <p className="alignright">{labels[props.category][2]}</p>
      {/* <label className='start_rating'>{labels[props.category][0]}</label>
      <label className='middle_rating'>{labels[props.category][1]}</label>
      <label className='end_rating'>{labels[props.category][2]}</label> */}
    </div>
  )
}

export default ProductsBreakdown