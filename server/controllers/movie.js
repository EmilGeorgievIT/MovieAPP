const Movie = require("../models/Movie");
const fs = require("fs");

module.exports = {
    createMovie: async (req, res, next) => {
        const {
            name,
            category,
            thePilot,
            country,
            releaseDate,
            director,
            boxoffice,
            rank,
            createdBy,
        } = req.body;
        Movie.create({
            name,
            category,
            thePilot,
            photo: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
            country,
            releaseDate,
            director,
            boxoffice,
            rank,
            createdBy,
        })
        .then((movie) => {
            res.status(200).json(
                { 
                    message: `The ${movie.name} has been added !`,
                    result: {
                        name: movie.name,
                        director: movie.director,
                        rank: movie.rank,
                        releaseDate: movie.releaseDate,
                        boxoffice: movie.boxoffice,
                        category: movie.category,
                        thePilot: movie.thePilot,
                        photo: movie.photo,
                        country: movie.country,
                        createdBy: movie.createdBy,
                    }
                } 
            );
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message || "Some error occurred while creating movie",
            });
        });
    },
    getAllMovies: (req, res, next) => {
        Movie.findAll()
            .then((movies) => {
                res.status(200).json({
                    result: movies
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving movies.",
                });
            });
    },
    getAllMovieImages: (req, res, next) => {
        const limit = req.query.limit? parseInt(req.query.limit) : 5;
        const sliderPage = req.query.sliderPage? req.query.sliderPage: 1;

        Movie.findAll(
                { 
                    attributes: ['photo'],
                    limit: limit,
                    offset: (limit - 1) * sliderPage,
                },
            )
            .then((movies) => {
                res.status(200).json({
                    result: movies
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving movies.",
                });
            });
    },
    getMovieDetails: (req, res, next) => {
        Movie.findOne({ where: { id: req.query.movieId }})
            .then((movie) => {
                res.status(200).json({
                    result: movie
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving movies.",
                });
            });
    },
    getMoviesByUserId: (req, res, next) => {
        Movie.findAll({ where: { createdBy: req.query.userId }})
            .then((movies) => {
                res.status(200).json({
                    result: movies
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving movies.",
                });
            });
    },
    deleteMovie: async (req, res, next) => {
        Movie.destroy({ where: { id: req.query.movieId }})
        .then(() => {
            res.status(200).json({
                "message" : `The Movie with ${req.query.movieId} has been deleted successfully !` 
            })
          })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while deleting movie."
            });
        });
    },
    updateMovie: (req, res, next) => {
        const movie = req.body;

        Movie.findOne({ where: { id: req.query.movieId } })
            .then(async (movieDetails) => {
                if (!movieDetails) {
                    const error = new Error("Movie not found !");
                    error.status = 404;
                    throw error;
                }
                movieDetails.name = movie.name;
                movieDetails.director = movie.director;
                movieDetails.rank = movie.rank;
                movieDetails.releaseDate = movie.releaseDate;
                movieDetails.boxoffice = movie.boxoffice;
                movieDetails.category = movie.category;
                movieDetails.thePilot = movie.thePilot;
                movieDetails.photo = movie.photo;
                movieDetails.country = movie.country;
                movieDetails.createdBy = movie.createdBy;

                return movieDetails.save();
            })
            .then((movieDetails) => {
                if (movieDetails) {
                    res.status(200).json({
                        message: `The movie with ${req.query.movieId} has been updated successfully !`,
                        result: movieDetails,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while updating movies.",
                });
            });
    },
};
