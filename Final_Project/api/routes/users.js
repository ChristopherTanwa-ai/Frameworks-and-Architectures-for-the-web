const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use(express.json());

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsersFromFile();

  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

router.post('/users', (req, res) => {
  const { username, password } = req.body;
  const users = getUsersFromFile();

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    res.status(409).json({ success: false, message: 'Username already exists' });
  } else {
    users.push({ username, password, basket: [] });
    saveUsersToFile(users);
    res.json({ success: true });
  }
});

router.get('/users', (req, res) => {
  const users = getUsersFromFile();
  res.json(users);
});

router.post('/remove', (req, res) => {
  const { username, itemId } = req.body;
  const users = getUsersFromFile();

  const user = users.find((u) => u.username === username);
  if (user) {
    const itemIndex = user.basket.findIndex((item) => item.id === itemId);
    console.log(itemIndex)
    if (itemIndex !== -1) {
      user.basket.splice(itemIndex, 1); // Remove the item from the user's basket
      saveUsersToFile(users); // Save the updated users to the JSON file
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in basket' });
    }
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

function getUsersFromFile() {
  const filePath = path.join(__dirname, 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return users;
}

function saveUsersToFile(users) {
  const filePath = path.join(__dirname, 'users.json');
  fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
}

module.exports = router;
