"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const ENV = require("./env.config");

const url = ENV.DATABASE_URL;
const db_name = ENV.DATABASE_NAME;

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let database, activitiesCollection, moodsCollection;

app.listen(port, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    };

    database = client.db(db_name);
    activitiesCollection = database.collection('activities');
    moodsCollection = database.collection('moods');
    console.log(`Connected to ${db_name}!`);
    
    app.get('/api', (req, res) => {
      res.send('Welcome to the ng-weather API');
    });

    app.get('/api/activities', (req, res) => {
      activitiesCollection.find({}).toArray((err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      })
    });

    app.get('/api/activities/:id', (req, res) => {
      activitiesCollection.findOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });

    app.post('/api/activities', (req, res) => {
      activitiesCollection.insertOne(req.body, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result.result);
      });
    });

    app.delete('/api/activities/:id', (req, res) => {
      activitiesCollection.deleteOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result.result);
      })
    });

    app.get('/api/moods', (req, res) => {
      moodsCollection.find({}).toArray((err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });

    app.get('/api/moods/:id', (req, res) => {
      moodsCollection.findOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });

    app.post('/api/moods', (req, res) => {
      moodsCollection.insertOne(req.body, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result.result);
      });
    });

    app.delete('/api/moods/:id', (req, res) => {
      moodsCollection.deleteOne({ "_id": new objectId(req.params.id) }, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(result);
      });
    });
  });
});