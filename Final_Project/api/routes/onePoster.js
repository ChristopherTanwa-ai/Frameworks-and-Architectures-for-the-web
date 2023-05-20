const express = require("express");
const router = express.Router();
const mainData = require('../data.json');
const path = require('path');
const fs = require('fs');


router.get("/:poster", function (req, res, next) {
  const { poster } = req.params;
  const artist = mainData[poster]
  console.log(artist);
  res.send(artist);
});

router.post("/:poster", (req, res) => {
  try {
    const filePath = path.join(__dirname, 'users.json');
    const { user, poster } = req.body;
    const curuser = user;

    if (curuser === null || curuser === '' || curuser === undefined) {
      const filePath2 = path.join(__dirname, 'xBasket.json');
      const basketData = JSON.parse(fs.readFileSync(filePath2, "utf8"));
      if (basketData.includes(poster)) {
        console.error("Poster already in cart");
        res.status(400).json({ message: "Poster already in cart" });
      }
      else {
        basketData.push(poster);
        fs.writeFileSync(filePath2, JSON.stringify(basketData));
        res.status(200).json({ message: "Poster added to basket" });
      }
    }
    else {
      const usersData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const userFound = usersData.find((u) => u.username === curuser.username);
      console.log(poster)
      console.log(userFound)
      if (userFound.basket.some(item => item.id === poster.id)) {
        console.error("Poster already in cart");
        res.status(400).json({ message: "Poster already in cart" });
      }
      else {
        userFound.basket.push(poster);
        fs.writeFileSync(filePath, JSON.stringify(usersData));
        res.status(200).json({ message: "Poster added to basket" });
      }
    }
  } catch (error) {
    console.error("Error in add to cart route:", error);
    res.status(500).json({ message: "Internal server error poop" });
  }
});


module.exports = router;