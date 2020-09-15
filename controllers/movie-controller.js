"use strict";

const MovieModel = require("../models/movie")
var ControllerMovie = () => {  };

ControllerMovie.getAll = async (req, res, next) =>
{
    try {
        MovieModel.find().then((movies, err) => {

            if(err) {
                res.send({ message: "No movies", status: 400 });
            }

            if(!movies) {
                res.send({ movies: [], message: "No movies" });
            }
            res.send({ movies: movies });
        });

        
      } catch (err) {
        res.send({ message: "Server error", status: 500 });
      }
    
}

ControllerMovie.add = (req, res, next) =>
{
    try {
        var movie = new MovieModel({
            name: req.body.name,
            date: req.body.date
        });
        
        movie.save().then((movieAdded, err) => {
            if(err)
            {
                var locals = {
                    title:"Error al agregar el registro con name: " + movieAdded.name,
                    description:"Error de Sintaxis SQL",
                    error:err
                }
        
                res.send({ error: locals});
            }
    
            res.send(movieAdded)
        });
    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
}

ControllerMovie.get = async (req, res, next) =>
{
    const movieId = req.params.movie_id;

    MovieModel.findOne({ _id: movieId }).then((movie) => {
        res.send({ movie: movie });
    });
}

ControllerMovie.update = async (req, res, next) =>
{
    try {
        
        const movieId = req.params.movie_id;

        MovieModel.findOne({ _id: movieId })
        .then((movie) => {
            res.send({ movie: movie });

            if(!movie) {
                var locals = {
                    title:"Error al modificar el registro con id: " + movieId,
                    description:" Movie was not found"
                }
        
                res.send({error: locals});
            }
            else {
                console.log('MOVIE FOUND:', movie);
                /*
                var movieUpdated = new MovieModel({
                    id: movieId,
                    name: req.body.name,
                    date: req.body.date
                });*/
                

                movie.save().then((movieUpdated, err) => {
                    res.send(movieUpdated)
                })
            }
        })
        .then((movie, err) => {
            if(err)
            {
                var locals = {
                    title:"Error al agregar el registro con name: " + movie.name,
                    description:"Error de Sintaxis SQL",
                    error:err
                }
        
                res.send({error: locals});
            }
    
            res.send(movie)
        });

    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
    
}

ControllerMovie.delete = async (req, res, next) =>
{
    try {
        const movieId = req.params.movie_id;

        MovieModel.remove({ _id: movieId })
        .then((movie) => {
            res.send({ message: 'movie was removed'})
        })

    } catch (err) {
        res.send({ message: "Server error", status: 500 });
    }
    
}


ControllerMovie.error404 = (req, res, next) =>
{
    var error = new Error();
	error.status = 404;

	var locals = {
		title:"ERROR 404",
		description:"RECURSO NO ENCONTRADO",
		error: error
	}

    res.send({ message: locals , status: 404 });
}

module.exports = ControllerMovie;