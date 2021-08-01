// Require section
const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require("./routes/postRoutes");
const redis = require("redis");

// Set up REDISDB variables
let redisClient = redis.createClient({
    host: REDIS_URL, port: REDIS_PORT
});

// Set up EXPRESS APP
const app = express();

// Set up MONGODB variables
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/suficiencia?authSource=admin`;

// MONGODB Connection
const connectWithRetry = () => {
    mongoose
    .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();

app.enable("trust proxy");

app.get('/', (req, res) => {
    res.send('<h1>Hello World! I am Leonel Avila C :D</h1>');
    console.log("Hello World!");
});

app.use(express.json());
// http://localhost:3001/api
app.use("/api", postRouter);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Listening on port: http://localhost:' + port));