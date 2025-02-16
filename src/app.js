const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const errorHandler = require('./middlewares/error.middleware');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(helmet());

app.get("/",(_, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
  })
app.use(errorHandler)
module.exports=app