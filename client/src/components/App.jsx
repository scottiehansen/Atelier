import React from 'react'
import axios from 'axios'
import QAMain from './Q&A/QAMain.jsx'
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
    axios.get('/products')
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.log(err))
  }


  render () {
    return (
      <div>
        <QAMain/>
      </div>
    )
  }

}

export default App;