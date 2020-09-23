
import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';


const app = express();


connectDB();

// Folder wherer server will serve static files
// Build folder is generated from a Frontend app in React
app.use(express.static(path.join(__dirname, '/build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/movies', require('./routes/api/movies_routes'));
app.use('/api/schedules', require('./routes/api/schedules_routes'));

/* Redirects any requests that are caught by any of other Api routes
 should be passes on to our app such as images*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app;