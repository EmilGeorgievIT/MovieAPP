const router = require('express').Router();
const movie = require('../controllers/movie');
const imageUpload = require("../middleware/image-upload");

router.post('/createMovie', imageUpload.single("photo"), movie.createMovie);

router.get("/getAllMovies", movie.getAllMovies);

router.get("/getMoviesByUserId", movie.getMoviesByUserId);

router.get("/getMovieDetails", movie.getMovieDetails);

router.delete("/deleteMovie", movie.deleteMovie);

router.put("/updateMovie", movie.updateMovie);


module.exports = router;
