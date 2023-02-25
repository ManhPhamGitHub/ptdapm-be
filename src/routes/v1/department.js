const router = require("express").Router();
const departmentController = require("../../controllers/departmentController.js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndHR,
} = require("../../middlewares/verifyToken.js");

// CREATE
router.post("/", verifyTokenAndAdmin, departmentController.createDepartment);

// GET DETAIL
router.get("/find/:id", departmentController.getDetailDepartment);

// GET ALL
router.get("/", departmentController.getAllDepartment);

// DELETE
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  departmentController.deleteDepartment
);

// UPDATE
router.put("/:id", verifyTokenAndAdmin, departmentController.updateDepartment);

// DELETE EMPLOYEE
router.put(
  "/:departmentId/delete/:employeeId",
  verifyTokenAndHR,
  departmentController.deleteEmployeeForDepartment
);

// ADD POSITION
router.post(
  "/:departmentId/position",
  verifyTokenAndHR,
  departmentController.addPosition
);

module.exports = router;
