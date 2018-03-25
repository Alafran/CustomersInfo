const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

customerSchema.statics.findByUserName = function(username,cb) {
  return this.find({userName: username},cb);
}

var Customer = mongoose.model('customer', customerSchema);



app.post('/', function (req, res) {
  var userNameToSearch = req.body.username;
  Customer.findByUserName(userNameToSearch,function(err, data) {
    if(err) {
      console.log(err);
    }
    console.log(data);
    res.send(data);
  });
});

app.listen(8000, function() {
  console.log("Listening on 27017!");
});
