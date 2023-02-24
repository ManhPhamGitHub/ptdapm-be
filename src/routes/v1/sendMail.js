const controllers = require('../../controllers/sendMailController') 
const router = require("express").Router();

router.post("/", controllers.sendmail)

module.exports = router
