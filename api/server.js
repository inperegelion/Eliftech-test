var MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const dbName = "test";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var myobj = [
    { name: "John", address: "Highway 71" },
    // { name: "Peter", address: "Longstreet 4" },
    // { name: "Amy", address: "Apple st 652" },
    // { name: "Hannah", address: "Mountain 21" },
    // { name: "Michael", address: "Valley 345" },
    // { name: "Sandy", address: "Ocean blvd 2" },
    // { name: "Betty", address: "Green Grass 1" },
    // { name: "Richard", address: "Sky st 331" },
    // { name: "Susan", address: "One way 98" },
    // { name: "Vicky", address: "Yellow Garden 2" },
    // { name: "Ben", address: "Park Lane 38" },
    // { name: "William", address: "Central st 954" },
    // { name: "Chuck", address: "Main Road 989" },
    // { name: "Viola", address: "Sideway 1633" },
  ];
  // dbo.collection("users").insertMany(myobj, function(err, res) {
  //   if (err) throw err;
  //   console.log("Number of documents inserted: " + res.insertedCount);
  //   db.close();
  // });
  dbo
    .collection("users")
    .find({}, { projection: { _id: 0, name: 1, address: 1 } })
    .sort({ address: 1 })
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  dbo
    .collection("users")
    .deleteOne({ address: "Mountain 21" }, function(err, obj) {
      if (err) throw err;
      console.log(obj.deletedCount);
    });
  db.close();
});
