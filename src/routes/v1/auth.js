const router = require("express").Router();
const authController = require("../../controllers/authController");
const { verifyToken } = require("../../middlewares/verifyToken");

router.post("/login", authController.loginUser);

router.post("/logout", verifyToken, authController.logOut);

router.post("/refreshToken", authController.refreshToken);

module.exports = router;
