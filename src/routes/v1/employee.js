const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");
const { verifyTokenAndHR } = require("../../middlewares/verifyToken");

router.post("/",  employeeController.createEmployee);
router.get("/", employeeController.getEmployeePagination);
router.get("/find/:id", employeeController.getDetailEmployee);
router.delete(
  "/delete/:id",
  verifyTokenAndHR,
  employeeController.getEmployeePagination
);

module.exports = router;
