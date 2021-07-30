const { REDIS_URL, REDIS_PORT } = require('../config/config');

const redis = require("async-redis");

// Set up REDISDB variables
let redisClient = redis.createClient({
    host: REDIS_URL, port: REDIS_PORT
});

exports.redis_getCountries = async (req, res, next) => {
    try {
        let countries = [];

        const keys = await redisClient.keys("country:*");

        for (var i = 0; i < keys.length; i++) {
            const value = await redisClient.get(keys[i]);
            countries.push({
                lugar : keys[i].replace("country:", ""),
                cantidad : value
            });
        }

        countries.sort(compare);
        countries = countries.slice(0, 10);

        res.status(200).json({
            status : 'success',
            data : {
                countries        
            }
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            status : 'fail'
        });
    }
}

function compare(a, b) {
    if ( a.cantidad < b.cantidad ){
        return 1;
    }
    if ( a.cantidad > b.cantidad ){
        return -1;
    }

    return 0;
}