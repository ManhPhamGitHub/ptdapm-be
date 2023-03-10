const controllers = require('../../controllers/boardingController') 
const router = require("express").Router();

router.post("/:boardingId", controllers.updateBoarding)

module.exports = router;
