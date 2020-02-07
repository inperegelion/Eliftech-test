const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const IncomingForm = require("formidable").IncomingForm;
const cors = require("cors");
const fs = require("fs");
const csv = require("csvtojson");

const mongoUrl = "mongodb://localhost:27017/";
const dbName = "test";
const collectionName = "orders";
//

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) return console.log(err);
  dbo = client.db(dbName).collection(collectionName);

  app.listen(3001);

  app.post("/new-orders", (req, res) => {
    dbo.save(req.body, (err, result) => {
      if (err) return console.log(err);

      console.log(req.body);
      // res.redirect("/")
    });
  });
  app.post("/upload-csv", (req, res) => {
    const form = new IncomingForm();

    form.on("file", (field, file) => {
      csv({ delimiter: ";", checkColumn: true })
        .fromFile(file.path)
        .then(jsonObj => {
          dbo.insertMany(jsonObj, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
          });
        })
        .catch(err => {
          console.error("Catched!", err.err);
        });
    });
    form.on("end", file => {
      res.json();
    });
    form.parse(req);
  });

  app.get("/get-orders", (req, res) => {
    dbo.find().toArray((err, result) => {
      if (err) return console.error(err);
      console.log(result);

      res.send(result);
    });
  });
});

//////////////////////////// Noob sign
if (false)
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

    // INSERT
    dbo.collection("users").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
    });

    // FIND & SORT
    dbo
      .collection("users")
      .find({ name: /^M/ }, { projection: { _id: 0, name: 1, address: 1 } })
      .sort({ address: 1 })
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      });

    // DELETE
    dbo
      .collection("users")
      .deleteOne({ address: "Mountain 21" }, function(err, obj) {
        if (err) throw err;
        console.log(obj.deletedCount);
      });

    // UPDATE
    dbo.collection("users").updateMany(
      { address: /^S/ },
      { $set: { name: "Minnie" } }, //
      function(err, res) {
        if (err) throw err;
        console.log(res.result);
      }
    );
    db.close();
  });
