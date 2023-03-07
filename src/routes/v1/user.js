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
router.put("/:id", verifyTokenAndAdmin, fileUpload.single('image'), userController.updateUser);
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
