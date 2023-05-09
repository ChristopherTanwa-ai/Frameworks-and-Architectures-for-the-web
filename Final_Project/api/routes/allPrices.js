const express = require("express");
const router = express.Router();
const mainData = require('../data.json');

router.get("/", function (req, res, next) {
    res.send({ ...allPrices(mainData) });
});

module.exports = router;

// finding all the artists in the database. It will return an array of all the artists.
function allPrices(price) {
    const data = mainData;
    const paintingKeys = Object.keys(data);
    const allPrices = [];
    for (let i = 0; i < paintingKeys.length; i++) {

        const paintingKey = paintingKeys[i];
        const painting = data[paintingKey];
        if (!allPrices.includes(painting.price)) {
            allPrices.push(painting.price);
        }
    }
    allPrices.sort(function (a, b) { return a - b });
    return allPrices;
}