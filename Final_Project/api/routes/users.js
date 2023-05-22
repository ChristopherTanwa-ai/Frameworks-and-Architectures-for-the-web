const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const userData = '../data/users.json';

router.use(express.json());

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsersFromFile();

  if (users.length === null || users.length === '' || users.length === undefined) {
    res.status(400).json({ message: 'No users found' });
    return;
  }

  const user = users.find((u) => u.email === email);

  if (user && user.password === password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const users = getUsersFromFile();

  let existingUser;

  if (users.length === null || users.length === '' || users.length === undefined) {
    existingUser = null;
  } else {
    existingUser = users.find((u) => u.email === email);
  }

  if (existingUser) {
    res.status(409).json({ success: false, message: 'User already exists' });
  } else {
    users.push({ firstName, lastName, email, password, basket: [] });
    saveUsersToFile(users);
    res.json({ success: true });
  }
});

router.get('/', (req, res) => {
  const users = getUsersFromFile();
  res.json(users);
});

router.post('/removeAccount', (req, res) => {
  const { email } = req.body;
  const users = getUsersFromFile();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex !== -1) {
    users.splice(userIndex, 1); // Remove the item from the user's basket
    saveUsersToFile(users); // Save the updated users to the JSON file
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: 'User not found' });
  }
});

router.get('/nousers', (req, res) => {
  const filePath = path.join(__dirname, '../data/xBasket.json');
  const basket = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(basket);
});

router.post('/remove', (req, res) => {
  const { email, itemId } = req.body;
  if (email) {
    //Insert if username ...
    const users = getUsersFromFile();
    const user = users.find((u) => u.email === email);
    console.log(user)
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
    const filePath = path.join(__dirname, '../data/xBasket.json');
    const basket = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const itemIndex = basket.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      basket.splice(itemIndex, 1); // Remove the item from the user's basket
      fs.writeFileSync(filePath, JSON.stringify(basket), 'utf8'); // Save the updated users to the JSON file
      res.json({ success: true });
    }
  }
});

function getUsersFromFile() {
  const filePath = path.join(__dirname, userData);
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return users;
}

function saveUsersToFile(users) {
  const filePath = path.join(__dirname, userData);
  fs.writeFileSync(filePath, JSON.stringify(users), 'utf8');
}

module.exports = router;
