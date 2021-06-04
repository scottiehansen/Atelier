const axios = require('axios');

const controllers = {
  getProducts: (req, res) => {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/${window.CAMPUS}/products`,
      headers: {
        'User-Agent': 'request',
        'Authorization': `token ${keys.API_KEY}`
      }
    }

    axios.get(options)
    .then
  }
}
