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
      console.log(response.data)
      this.setState({
        products: response.data
      })
    })
    .catch(err => console.log(err))
  }


  render () {
    return (
      <div>

        {this.state.products.map((item, index) => <StarRender item={item} key={index} />)}
      </div>
    )
  }

}

export default App;