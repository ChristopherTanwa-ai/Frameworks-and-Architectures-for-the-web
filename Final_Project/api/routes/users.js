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
