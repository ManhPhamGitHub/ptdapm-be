const controllers = require('../../controllers/sendMailController') 
const router = require("express").Router();

router.post("/", controllers.sendMail)
router.post("/all", controllers.sendMailAll)

module.exports = router
