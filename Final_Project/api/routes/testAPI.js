var express = require("express");
var router = express.Router();
import mainData from '../data.json'


router.get("/", function(req, res, next) {
    res.render({mainData});
    res.send(mainData)
    console.log(mainData);
});

module.exports = router;