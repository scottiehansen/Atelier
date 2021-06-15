import React from 'react';

let productCharacteristics = (props) => {

  const characteristics = {
    'size' : ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    'width' : ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    'comfort' : ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    'quality' : ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    'length' : ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    'fit' : ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  }

  return (
    <div>
      {Object.keys(characteristics).map(type => (
        <div className={`write_${type}`} >
          {characteristics[type].map((selection, index) => (
            <div className="radio">
              <label>
                <input type="radio" value={selection} checked={props.productCharacteristics[selection] === (index + 1)}
                onChange={() => props.dispatchProductCharacteristics({type: 'add', characteristicType : selection, characteristicValue : index + 1})} />
              </label>
            </div>
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

export default productCharacteristics;