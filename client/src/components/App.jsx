import React from 'react'
import axios from 'axios'
const keys = require('../config/config.js')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    this.getProducts = this.getProducts.bind(this)
  }

  componentDidMount() {
    this.getProducts()
  }


  getProducts () {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${window.CAMPUS}/products`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${keys.API_KEY}`
      }
    }

    axios.get(options)
    .then(response => {
      this.setState({
        products: response.data
      })
    })
  }


  render () {
    return (
      <div>
        hello
      </div>
    )
  }

}

export default App;