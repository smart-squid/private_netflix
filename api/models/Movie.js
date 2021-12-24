const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String },
        img: { type: String },
        imgTitle: { type: String },
        imgTrailer: { type: String },
        imgSmall: { type: String },
        video: { type: String },
        duration: { type: Number },
        genre: { type: String },
        actors: { type: String },
        releaseDate: { type: String },
        isSeries: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
