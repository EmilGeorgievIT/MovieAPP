const router = require('express').Router();
const movie = require('../controllers/movie');
const imageUpload = require("../middleware/image-upload");
const isAuth = require('../middleware/is-auth');

router.post('/createMovie', isAuth, imageUpload.single("photo"), movie.createMovie);

router.get("/getAllMovies", movie.getAllMovies);

router.get("/getMoviesByUserId", isAuth, movie.getMoviesByUserId);

router.get("/getMovieDetails", movie.getMovieDetails);

router.delete("/deleteMovie", isAuth, movie.deleteMovie);

router.put("/updateMovie", isAuth, movie.updateMovie);


module.exports = router;
