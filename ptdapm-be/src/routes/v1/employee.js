const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");
const {
  verifyTokenAndHR,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");

router.post("/", employeeController.createEmployee);
router.put(
  "/:employeeId",
  verifyTokenAndAdmin,
  employeeController.updateEmployee
);
router.get("/", employeeController.getEmployeePagination);
router.get("/find/:id", employeeController.getDetailEmployee);
router.delete(
  "/delete/:id/:contractId",
  verifyTokenAndHR,
  employeeController.deleteEmployee
);

module.exports = router;
