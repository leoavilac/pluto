const express = require("express");
const postController = require("../controllers/postController");
const redisController = require("../controllers/redisController");

const router = express.Router();

// http://localhost:3001/api/
router
    .route('/')
    .get(postController.getAllPersons)
    .post(postController.registerPerson);

// http://localhost:3001/api/redis/
router
    .route('/redis/')
    .get(redisController.redis_getCountries);

router
    .route('/mongo/')
    .get(postController.countByGender);

// http://localhost:3001/api/:id
router
    .route('/:id')
    .delete(postController.deletePerson);



module.exports = router;