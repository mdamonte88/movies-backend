const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


module.exports = app;