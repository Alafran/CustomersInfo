var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/customerdb";

mongo.connect(url, function(err, db) {
  if(err) {
    console.log(err);
  }
  var collection = db.collection('customers');

  collection.find({username:"billyjean"}, function(err,doc) {
    if(err) {
      console.log(err);
    }
    console.log(doc);
  });
  db.close();
});
