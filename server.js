const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Get route for getting all users
app.get('/users', function(req, res) {
  getUsers = fs.readFileSync(__dirname+'/storage.json', 'utf8')
  res.send(getUsers)
});

// Get route for getting a user by name
app.get('/users/:name', function(req, res) {
  let storage = fs.readFileSync(__dirname+'/storage.json', 'utf8')
  let userData = JSON.parse(storage);
  let user = {name: req.body.name, email: req.body.email, state: req.body.state}
  let userName = userData.find(user => user.name === req.params.name)


  if (userName){
    res.send(userName)
  }
  res.sendStatus(404)

});

// Create route for creating new users
app.post('/users', function(req, res) {
  let storage = fs.readFileSync(__dirname+'/storage.json', 'utf8');
  let userData = JSON.parse(storage);
  let user = {name: req.body.name, email: req.body.email, state: req.body.state}

  userData.push(user);
  fs.writeFileSync(__dirname+'/storage.json', JSON.stringify(userData));
  console.log('posted user')
});

// Update route for updating a user by name
app.put('/users/:name', function(req, res) {
  let storage = fs.readFileSync(__dirname+'/storage.json', 'utf8');
  let userData = JSON.parse(storage);
  let user = {name: req.body.name, email: req.body.email, state: req.body.state}
  let userName = userData.find(user => user.name === req.params.name)

  if (userName){
    userName = user;
    fs.writeFileSync(__dirname+'/storage.json', JSON.stringify(userData));
    console.log('replaced user name')
  } else {
    res.sendStatus(404)
  }
});

// Delete route for deleting a user by name
app.delete('/users/:name', function(req, res) {
  let storage = fs.readFileSync(__dirname+'/storage.json', 'utf8');
  let userData = JSON.parse(storage);
  let user = {name: req.body.name, email: req.body.email, state: req.body.state}
  let userName = userData.find(user => user.name === req.params.name)

  if(userName){
    userData.splice(userData.indexOf(userName), 1);
    fs.writeFileSync(__dirname+'/storage.json', JSON.stringify(userData));
    console.log('deleted user')
  } else {
    res.sendStatus(404)
  }
});

app.use(function(req, res) {
res.sendStatus(404);
});

app.listen(port, function() {
console.log('Listening on port', port);
});

// Stretch: Add an id field to the object and use that instead of name for all of your routes.
