const router = require("express").Router();
const userController = require("../../controllers/userController.js");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");

router.post("/register", verifyTokenAndAdmin, userController.registerUser);
router.get("/", userController.getUserPagination);
router.get("/find/:id", userController.getUser);
router.put("/:id", verifyTokenAndAdmin, userController.updateUser);
router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

module.exports = router;
