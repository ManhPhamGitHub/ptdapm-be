const router = require("express").Router();
const controllers = require('../../controllers/excelController') 
 console.log("da vao route");
router.post("/", controllers.excel)

module.exports = router