const Post = require("../models/postModel");
const redis = require("redis");
const { REDIS_URL, REDIS_PORT } = require('../config/config');

// Set up REDISDB variables
let redisClient = redis.createClient({
    host: REDIS_URL, port: REDIS_PORT
});


exports.getAllPersons = async (req, res, next) => {
    try {
        const persons = await Post.find();

        res.status(200).json({
            status : 'success',
            results : persons.length,
            data : {
                persons
            }
        });
    } catch (e) {
        res.status(400).json({
            status : 'fail'
        });
    }
};

exports.registerPerson = async (req, res, next) => {
    try {
        const person = await Post.create(req.body);
        const increment = await redisClient.incr('country:' + person.location);

        res.status(200).json({
            status : 'success',
            redis : increment,
            data : {
                person
            }
        });
    } catch (e) {
        res.status(400).json({
            status : 'fail'
        });
    }
}

exports.deletePerson = async (req, res, next) => {
    try {
        const person = await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status : 'success'
        });
    } catch (e) {
        res.status(400).json({
            status : 'fail'
        });
    }
};

exports.countByGender = async (req, res, next) => {
    try {
        const male = await Post.aggregate([
            {   
                $match : { 'gender' : 'male' },
            },
            {
                $group : {
                    _id : { location : "$location" },
                    total : { $sum : 1 }
                }
            }
        ]);

        const female = await Post.aggregate([
            {   
                $match : { 'gender' : 'female' },
            },
            {
                $group : {
                    _id : { location : "$location" },
                    total : { $sum : 1 }
                }
            }
        ]);

        res.status(200).json({
            status : 'success',
            data : {
                male,
                female
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status : 'fail'
        });
    }
}