import React from 'react';

let Characteristics = (props) => {

  const characteristics = {
    'Size' : ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    'Width' : ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    'Comfort' : ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    'Quality' : ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    'Length' : ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    'Fit' : ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  }

  return (
    <div>
      {Object.keys(characteristics).map(type => (
        <div className={`write_${type}`} >
          <label>{type} :</label>
          {characteristics[type].map((selection, index) => (
            <span className="radio">
              <label>{selection} </label>
                <input type="radio" value={selection} checked={(props.productCharacteristics[type] === selection)}
                onChange={() => props.makeProductCharacteristics({...props.productCharacteristics, [type]: selection})} />
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
/* <div className='write-size'>
        <div className="radio">
          {for each }
          <label>
            <input type="radio" value="A size too small" checked={props.productRecommendation[size] === 0} onChange={() => props.changeProductRecommendation(true)} />
            Yes
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="1/2 a size too small" checked={props.productRecommendation[size] === 1} onChange={() => props.changeProductRecommendation(false)} />
            No
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="Perfect" checked={props.productRecommendation[size] === 2} onChange={() => props.changeProductRecommendation(false)} />
            No
          </label>
        </div>
      </div> */

export default Characteristics;