const router = require("express").Router();
const contractController = require("../../controllers/contractController")

router.post("/", contractController.updatePdf);

module.exports = router;
