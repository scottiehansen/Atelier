import React from 'react';
import axios from 'axios';
import Reviews from './Reviews'
const keys = require('../config/config.js')
import StarRender from './productDetails/StarRender.jsx';
import MainProduct from './productDetails/MainProduct.jsx';
import QAMain from './Q&A/QAMain.jsx';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
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
      <div className='reviews'>
        <MainProduct item={this.state.products[0]} />
        <StarRender item={this.state.products[0]} />
        <Reviews />
        <QAMain product={this.state.products[2]} />

      </div>
    )
  }
}

export default App;