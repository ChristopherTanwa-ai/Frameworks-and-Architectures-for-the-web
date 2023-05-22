const express = require("express");
const router = express.Router();
const mainData = require('../data/data.json');


router.get("/", function (req, res, next) {
  res.send({ ...mainData });
});

module.exports = router;

