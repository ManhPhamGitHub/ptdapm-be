const router = require("express").Router();
const departmentController = require("../../controllers/departmentController.js");

// CREATE
router.post("/", departmentController.createDepartment);

// GET DETAIL
router.get("/find/:id", departmentController.getDetailDepartment);

// GET ALL
router.get("/", departmentController.getAllDepartment);

// DELETE
router.delete("/:id", departmentController.deleteDepartment);

// UPDATE
router.put("/:id", departmentController.updateDepartment);

// DELETE EMPLOYEE
router.put(
  "/:departmentId/delete/:employeeId",
  departmentController.deleteEmployeeForDepartment
);

// ADD POSITION
router.post("/:departmentId/position", departmentController.addPosition);

module.exports = router;
