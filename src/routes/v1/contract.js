const router = require("express").Router();
const contractController = require("../../controllers/contractController")

router.put("/:id", contractController.updateContract);
router.get("/", contractController.getContract);
router.delete("/:id", contractController.updateContract);   

module.exports = router;