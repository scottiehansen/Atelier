import React from 'react';
import axios from 'axios';
import Ratings from './Ratings'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <Ratings />
      </div>
    )
  }

}

export default App;