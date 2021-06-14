import React from 'react';
import axios from 'axios';
import Reviews from './Reviews'
const keys = require('../config/config.js')
import StarRender from './productDetails/StarRender.jsx';
import MainProduct from './productDetails/MainProduct.jsx';
import QAMain from './Q&A/QAMain.jsx';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
      <div>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand>Project Catwalk</Navbar.Brand>
            <Nav>
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Our Story</Nav.Link>
              <NavDropdown title='Products'>
                <NavDropdown.Item>1</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
        <MainProduct item={this.state.products[2]} />
        <StarRender item={this.state.products[2]} />
        <Reviews />
        <QAMain product={this.state.products[2]} />
      </div>
    )
  }
}

export default App;