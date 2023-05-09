const express = require("express");
const router = express.Router();
const mainData = require('../data.json');
const path = require('path');
const fs = require('fs');


router.get("/:poster", function(req, res, next) {
  const{poster} = req.params;
  const artist = mainData[poster]
  res.send(artist);
});

router.post("/:poster", (req, res) => {
  try {
    const filePath = path.join(__dirname, 'users.json');
    const { user, poster } = req.body;

    // Get the user ID from the session
    const curuser = user;

    // Load the users data from the file
    const usersData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Find the user with the given ID
    const userFound = usersData.find((u) => u.username === curuser.username);

    // Add the poster to the user's basket
    userFound.basket.push(poster);

    // Save the updated users data back to the file
    fs.writeFileSync(filePath, JSON.stringify(usersData));

    // Return a success response
    res.status(200).json({ message: "Poster added to basket" });
  } catch (error) {
    console.error("Error in add to cart route:", error);
    res.status(500).json({ message: "Internal server error poop" });
  }
});


module.exports = router;