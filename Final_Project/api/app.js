var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var randomPostersRouter = require("./routes/randomPosters.js");
var allPoster = require("./routes/allProducts.js");
const fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/randomPosters", randomPostersRouter);
app.use("/allPosters", allPoster);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Jakobs hjørne af problemer
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsersFromFile();

  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect password' });
  }
});

app.post('/users', (req, res) => {
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

app.get('/users', (req, res) => {
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

module.exports = app;

