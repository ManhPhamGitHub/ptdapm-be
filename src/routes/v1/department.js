const router = require("express").Router();
const departmentController = require("../../controllers/departmentController.js");

router.post("/", departmentController.createDepartment);

module.exports = router;
