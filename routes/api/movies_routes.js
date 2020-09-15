const express = require("express"),
      controller = require("../../controllers/movie-controller"),
      router = express.Router();


// @route  GET api/movies
// @desc   Get all movies
// @access Public
router.get("/", controller.getAll );


// @route  POST api/movies
// @desc   Add a new movie
// @access Public
router.post('/', controller.add );


// @route  GET api/movies/movie/:id
// @desc   GET a movie
// @access Public
router.get("/movie/:movie_id", controller.get )


// @route  PUT api/movies/movie/:id
// @desc   Update a movie
// @access Public
router.put("/movie/:movie_id", controller.update )

// @route  DELETE api/movies/movie/:id
// @desc   Remove a movie
// @access Public
router.delete("/movie/:movie_id", controller.delete )


router.use( controller.error404 );


module.exports = router;
