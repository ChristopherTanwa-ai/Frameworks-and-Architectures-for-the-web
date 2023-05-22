const express = require("express");
const router = express.Router();
const mainData = require('../data/data.json');

router.get("/", function (req, res, next) {
    res.send({ ...allArtists(mainData) });
});

module.exports = router;

// finding all the artists in the database. It will return an array of all the artists.
function allArtists(artist) {
    const data = mainData;
    const paintingKeys = Object.keys(data);
    const allArtists = [];
    for (let i = 0; i < paintingKeys.length; i++) {

        const paintingKey = paintingKeys[i];
        const painting = data[paintingKey];
        if (!allArtists.includes(painting.artist)) {
            allArtists.push(painting.artist);
        }
    }
    allArtists.sort();
    return allArtists;
}