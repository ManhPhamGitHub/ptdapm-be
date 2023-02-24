const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getEmployeePagination);

module.exports = router;

