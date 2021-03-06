const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const bodyParser = require("body-parser");
const IncomingForm = require("formidable").IncomingForm;
const cors = require("cors");
const fs = require("fs");
const csv = require("csvtojson");
const moment = require("moment");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

MongoClient.connect(process.env.MONGO_DB_SERVER, (err, client) => {
  if (err) return console.log(err);
  dbo = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_NAME);

  app.listen(process.env.PORT || 3000);

  app.post("/upload-csv", (req, res) => {
    const form = new IncomingForm();

    form.on("file", (field, file) => {
      csv({ delimiter: ";", checkColumn: true })
        .fromFile(file.path)
        .then(
          jsonObj => {
            jsonObj.map(order => {
              order.formattedDate = moment(order.date, "DD.MM.YYYY hh:mm:ss") //
                .format("MMM YYYY");
              return order;
            });
            console.log(jsonObj);

            dbo.insertMany(jsonObj, (err, result) => {
              if (err) throw err;
              else {
                console.log("Number of documents inserted: " + result.insertedCount);
                res.status(200).json();
              }
            });
          },
          err => {
            console.error("invalid csv received");
            res.status(400).send("Probably invalid csv");
          }
        );
    });
    form.parse(req);
  });

  app.get("/get-orders", (req, res) => {
    const sortObj = {};
    sortObj[req.query.sortBy] = 1;

    dbo
      .find()
      .sort(sortObj)
      .toArray((err, result) => {
        if (err) return console.error(err);
        console.log(req.query);
        res.send({
          totalSize: result.length,
          orders: result.slice(Number(req.query.from), Number(req.query.to)),
        });
      });
  });

  /** IMPORTANT CODE BELOW!
   *  I'm writing this just at the first deadline minutes. As U can C, the
   *  optional part is about to be ready.The operation is ready to be implemented
   *  but it, sadly, is not :(
   *  */

  app.get("/get-user-statistics", (req, res) => {
    dbo
      .aggregate([
        {
          $sort: { user_email: 1 },
        },
        {
          $group: {
            _id: {
              user_email: "$user_email",
              formattedDate: "$formattedDate",
              status: "approved",
            },
            total: { $sum: 1 },
          },
        },
      ])
      .toArray((err, result) => {
        console.log(result);
      });
  });
});
