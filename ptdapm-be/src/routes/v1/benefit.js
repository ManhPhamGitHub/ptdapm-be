const benefitController = require("../../controllers/benefitController");
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, benefitController.createBenefit);

// GET ALL
router.get("/", benefitController.getAllBenefits);

// GET DETAIL
router.get("/:id", benefitController.getDetailBenefit);

// UPDATE BENEFIT
router.put("/:id", verifyTokenAndAdmin, benefitController.updateBenefit);

// DELETE BENEFIT
router.delete("/:id", verifyTokenAndAdmin, benefitController.deleteBenefit);

// ADD AND REMOVE HOLIDAY
router.post(
  "/:id/holiday",
  verifyTokenAndAdmin,
  benefitController.addAndRemoveHolidayToBenefit
);

// UPDATE HOLIDAY
router.put(
  "/:benefitId/holiday/:holidayId",
  verifyTokenAndAdmin,
  benefitController.updateHoliday
);

module.exports = router;
