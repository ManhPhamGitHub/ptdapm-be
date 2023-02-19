const benefitController = require("../../controllers/benefitController");

const router = require("express").Router();

router.post("/", benefitController.createBenefit);

module.exports = router;
