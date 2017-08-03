var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; //need to convert regular id into special mongodb object id
var db = require('./db');
var artistsController = require('./controllers/artists');

var app = express();

app.use(bodyParser.json()); //we need this to parse json which we transfered into body
app.use(bodyParser.urlencoded({ extended: true })); //we need this to have ability to parse form data

//Show Hello API message when go to root
app.get('/', function (req, res) {
  res.send('Hello API')
})

app.get('/artists', artistsController.all);

//Find Single Artist by ID
app.get('/artists/:id', artistsController.findById);

//Add New Artist
app.post('/artists', artistsController.create);

//Update an Artist
app.put('/artists/:id', artistsController.update);

//Delete an Artist
app.delete('/artists/:id', artistsController.delete);

//Setup Connection to Mondodb
db.connect('mongodb://localhost:27017/myapi', function (err) {
  if (err) {
    return console.log(err);
  }
  app.listen(3012, function () {
    console.log('API app started');
  })
})

//artists.push(artist); //push new json object into artist array
