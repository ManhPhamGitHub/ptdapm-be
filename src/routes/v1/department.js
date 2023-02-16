const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("department");
});

module.exports = router;
