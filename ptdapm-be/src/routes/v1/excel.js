const router = require("express").Router();
const controllers = require('../../controllers/excelController')
router.post("/", controllers.importExcel)

module.exports = router