const controllers = require('../../controllers/reportController') 
const router = require("express").Router();

router.get("/", controllers.reportEmployee)

module.exports = router
