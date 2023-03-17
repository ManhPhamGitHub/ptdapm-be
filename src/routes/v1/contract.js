const router = require("express").Router();
const contractController = require("../../controllers/contractController")

router.post("/", contractController.updateContract);

module.exports = router;