import React from 'react'
import axios from 'axios'
import QAMain from './Q&A/QAMain.jsx'
// const keys = require('../config/config.js')

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


  getProducts() {
    axios.get('/products')
      .then(response => {
        console.log(response.data)
        this.setState({ products: response.data })
      })
      .catch(err => console.log(err))
  }


  render() {
    if (this.state.products.length === 0) {
      return <div>...loading</div>
    } else {
      return (
        <div>
          <QAMain product={this.state.products[1]} />
        </div>
      )
    }
  }

}

export default App;