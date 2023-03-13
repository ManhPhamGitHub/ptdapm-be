const controllers = require('../../controllers/reportController') 
const router = require("express").Router();

router.get("/employee", controllers.reportEmployee)

module.exports = router
