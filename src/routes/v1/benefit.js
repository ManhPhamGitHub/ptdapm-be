const benefitController = require("../../controllers/benefitController");

const router = require("express").Router();

//CREATE
router.post("/", benefitController.createBenefit);

// GET ALL
router.get("/", benefitController.getAllBenefits);

// GET DETAIL
router.get("/:id", benefitController.getDetailBenefit);

// UPDATE BENEFIT
router.put("/:id", benefitController.updateBenefit);

// DELETE BENEFIT
router.delete("/:id", benefitController.deleteBenefit);

// ADD AND REMOVE HOLIDAY
router.post("/:id/holiday", benefitController.addAndRemoveHolidayToBenefit);

// UPDATE
router.put("/:benefitId/holiday/:holidayId", benefitController.updateHoliday);

module.exports = router;
