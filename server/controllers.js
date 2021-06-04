const axios = require('axios');
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

module.exports = controllers;