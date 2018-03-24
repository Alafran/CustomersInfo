const express = require('express');
const app = express();

const http = require('http');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customerdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected");
});

var customerSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  gender: String,
  eyeColor: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: Number
  }
});

var Customer = mongoose.model('customer', customerSchema);

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(27017);
