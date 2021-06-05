const axios = require('axios');
<<<<<<< HEAD
const key = require('./config/config.js')

const controllers = {
  getProducts: (req, res) => {
    const config = {
      headers: {Authorization: `${key}`}
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`, config)
      .then(response => {res.status(200).send(response.data)})
      .catch(error => {res.status(405).send(error)});
  }
}


=======
const keys = require('../client/src/config/config.js')

const controllers = {
  getProducts: (req, res) => {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${keys.CAMPUS}/products`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer' + keys.API_KEY
      }
    }

    axios.get(options.url, options.headers)
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
  }
}

>>>>>>> main/testing
module.exports = controllers;