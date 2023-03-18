const router = require("express").Router();
const contractController = require("../../controllers/contractController")

router.post("/", contractController.updateContract);
router.get("/", contractController.getContract);
router.delete("/:id", contractController.delContract);

module.exports = router;