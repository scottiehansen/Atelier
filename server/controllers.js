const axios = require('axios');
const key = require('./config/config.js')

const controllers = {
  getProducts: (req, res) => {
    const config = {
      headers: {Authorization: `${key.API_KEY}`}
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`, config)
      .then(response => {res.status(200).send(response.data)})
      .catch(error => {res.status(404).send(error)});
  }
}


module.exports = controllers;
