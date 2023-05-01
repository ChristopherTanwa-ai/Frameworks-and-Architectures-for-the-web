var express = require('express');
var router = express.Router();
var fs = require('fs')
router.use(express.json())

/* GET users listing. */
router.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


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
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  return users;
}

function saveUsersToFile(users) {
  fs.writeFileSync('users.json', JSON.stringify(users), 'utf8');
}

module.exports = router;
