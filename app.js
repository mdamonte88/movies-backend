"use strict";

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require("morgan");
const path = require('path');

connectDB();
//Server build folder of a Frontend app in React
app.use(express.static(path.join(__dirname, '/build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/movies', require('./routes/api/movies_routes'));
app.use('/api/schedules', require('./routes/api/schedules_routes'));

//Redirect any requests that are caught by any of other Api routes should be passes on to our app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app;