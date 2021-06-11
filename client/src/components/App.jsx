import React from 'react';
import axios from 'axios';
const keys = require('../config/config.js')
import StarRender from './productDetails/StarRender.jsx';
import MainProduct from './productDetails/MainProduct.jsx';

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
    axios.get('/api/products')
    .then(response => {
      this.setState({
        products: response.data
      })
    })
    .catch(err => console.log(err))
  }


  render () {
    if (this.state.products.length === 0) {
      return (
        <div>loading</div>
      )
    }
    return (
      <div>
        <MainProduct item={this.state.products[2]} />
        <StarRender item={this.state.products[2]} />
      </div>
    )
  }
}

export default App;