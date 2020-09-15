"use strict";

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/movies', require('./routes/api/movies_routes'));
app.use('/api/schedules', require('./routes/api/schedules_routes'));


module.exports = app;