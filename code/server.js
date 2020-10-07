const express = require('express')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(bodyParser.json());




let apiInstance = null;

exports.start = () => {
  apiInstance = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
}

exports.stop = () => {
  apiInstance.close();
}