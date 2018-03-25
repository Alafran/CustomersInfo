var mongo = require('mongodb').MongoClient;
var db = require('./config/db');

mongo.connect(db.url, function(err, database) {
  if(err) {
    console.log(err);
  }
  var collection = database.db('customersinfosample').collection('customers');

  collection.insert({
    userName: "billyjean",
    firstName: "billy",
    lastName: "jean",
    gender: "male",
    eyeColor: "brown",
    address: {
      street: "100 N Colonial Ave",
      city: "Richmond",
      state: "VA",
      zip: 23221
    }
  });
  db.close();
});
