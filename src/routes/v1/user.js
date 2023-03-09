const router = require("express").Router();
const userController = require("../../controllers/userController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");
const fileUpload = require('../../middlewares/fileUpload');
router.post("/register", userController.registerUser);
router.get("/", userController.getUserPagination);
router.get("/find/:id", userController.getUser);
router.put("/:id", verifyTokenAndAdmin, userController.updateUser);
router.put("/change-password/:id", verifyTokenAndAdmin, userController.changePassword);
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
