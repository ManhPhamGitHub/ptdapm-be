const controllers = require('../../controllers/boardingController') 
const router = require("express").Router();

router.post("/", controllers.addUpdateBoarding)
router.get("/", controllers.getBoarding)
router.get("/:boardingId", controllers.getBoarding)
router.delete("/:boardingId", controllers.delBoarding)

module.exports = router;
