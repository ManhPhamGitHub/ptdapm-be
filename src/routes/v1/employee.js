const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

router.post("/api/v1/employees", employeeController.createEmployee);
router.get("/api/v1/employees", employeeController.getEmployeePagination);

module.exports = router;

