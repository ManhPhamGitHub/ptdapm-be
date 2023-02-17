const router = require("express").Router();
const userController = require("../../controllers/userController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");

router.post("/register", verifyTokenAndAdmin, userController.registerUser);

module.exports = router;
