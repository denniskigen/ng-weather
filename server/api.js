"use strict";

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const serverless = require("serverless-http");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const router = express.Router();

const port = process.env.PORT;
const url = process.env.DATABASE_URL;
const db_name = process.env.DATABASE_NAME;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let database, activitiesCollection, moodsCollection;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    };

    database = client.db(db_name);
    activitiesCollection = database.collection('activities');
    moodsCollection = database.collection('moods');
    console.log(`Connected to ${db_name}!`);
    
    router.get('/api', (req, res) => {
      res.send('Welcome to the ng-weather API');
    });

    router.get('/api/activities', (req, res) => {
      activitiesCollection.find({}).toArray((err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      })
    });

    router.get('/api/activities/:id', (req, res) => {
      activitiesCollection.findOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });

    router.post('/api/activities', (req, res) => {
      activitiesCollection.insertOne(req.body, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result.result);
      });
    });

    router.delete('/api/activities/:id', (req, res) => {
      activitiesCollection.deleteOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result.result);
      })
    });

    router.get('/api/moods', (req, res) => {
      moodsCollection.find({}).toArray((err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });

    router.get('/api/moods/:id', (req, res) => {
      moodsCollection.findOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });

    router.post('/api/moods', (req, res) => {
      moodsCollection.insertOne(req.body, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result.result);
      });
    });

    router.delete('/api/moods/:id', (req, res) => {
      moodsCollection.deleteOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });
  });
});

// app.use(router);

app.use('/.netlify/functions/api', router);  // path must route to lambda

module.exports.handler = serverless(app);