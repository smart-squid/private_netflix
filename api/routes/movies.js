const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// Create
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
            res.status(200).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

// Update
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

// Delete
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

// Get
router.get("/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Random
router.get("/find/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;

    try {
        if (type) {
            if (type === "series") {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } },
                ]);
            } else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } },
                ]);
            }
        } else {
            movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized");
    }
});

module.exports = router;
