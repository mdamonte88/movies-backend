
import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import logger from 'morgan';

import errors from './middlewares/errors';
import auth from './routes/api/auth_routes';

import path from 'path';


const app = express(),
    buildDir = express.static(path.join(__dirname,"build")),
    port = (process.env.PORT || 5000);
    // viewDir = path.join(__dirname,"views");

connectDB();


app.set("port", port);

// Enables this lines to allows to the views was made with Jade and adds the viewDir to the consts
// app.set("views", viewDir);
// app.set("view engine","jade");


// Folder wherer server will serve static files
// Build folder is generated from a Frontend app in React
app.use(buildDir)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

app.use(session({secret: "shhhhhhhh",saveUnititialized: true, resave: true})); 

app.get('/', (req, res) => res.send('API Running'));
app.use('/api/auth', require('./routes/api/auth_routes'));
app.use('/api/movies', require('./routes/api/movies_routes'));
app.use('/api/schedules', require('./routes/api/schedules_routes'));


//app.use(auth);
//app.use(errors.http404);

/* Redirects any requests that are caught by any of other Api routes
 should be passes on to our app such as images*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

module.exports = app;