const express = require("express");
const router = express.Router();
const mainData = require('../data.json');


router.get("/", function(req, res, next) {
  res.send({...randomPosters(mainData)});
});

module.exports = router;

function randomPosters(artist){
  const posters = mainData;
  const posterKeys = Object.keys(posters);
  const selectedPosters = [];
  let i = 0;

  while(i < 4) {
    const randomIndex = Math.floor(Math.random() * posterKeys.length);
    const posterKey = posterKeys[randomIndex];
    const poster = posters[posterKey];
    if(poster != artist && !selectedPosters.some(p => p.id === posterKey)){
      selectedPosters.push({...poster, id: posterKey});
      i++;
  }
  }
  return selectedPosters;
}