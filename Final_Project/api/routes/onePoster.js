const express = require("express");
const router = express.Router();
const mainData = require('../data.json');


router.get("/:poster", function(req, res, next) {
  const{poster} = req.params;
  const artist = mainData[poster]
  res.send(artist);
});

module.exports = router;