const axios = require('axios');
const key = require('./config/config.js')

const controllers = {
  getProducts: (req, res) => {
    const config = {
      // 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
      // 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
      headers: {Authorization: `${key}`}
    };
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`, config)
      .then(response => {res.status(200).send(response.data)})
      .catch(error => {res.status(405).send(error)});
  }
}


module.exports = controllers;