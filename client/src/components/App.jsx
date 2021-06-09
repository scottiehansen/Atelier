import React from 'react';
import axios from 'axios';
import Reviews from './Reviews'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='reviews'>
        <Reviews />
      </div>
    )
  }

}

export default App;