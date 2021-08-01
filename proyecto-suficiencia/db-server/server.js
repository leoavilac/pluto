const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT } = require('./config/config');
const redis = require("redis");

// Set up REDISDB variables
let redisClient = redis.createClient({
    host: REDIS_URL, port: REDIS_PORT
});

// Set up EXPRESS app
const express = require('express');
const app = new express();

const MongoClient = require("mongodb").MongoClient;
const DB_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

var db;
MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db("suficiencia");
});
  

app.use(express.json({ limit: '5mb', extended: true }));

app.post('/', async (req, res) => {
    const data = req.body;
    try {
        let collection = db.collection("personas");
        let result = await collection.insertOne(data);
        const increment = await redisClient.incr('country:' + data.location);
        res.json(result.ops[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'failed' });
    }
});

app.get('/', (req, res) => {
    db.collection("personas").find({}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ 'message': 'failed' });
        } else {
            res.json(result);
        }
    });
});

app.listen(5000);