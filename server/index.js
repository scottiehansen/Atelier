const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/', router);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening in on port ${port}`)
})