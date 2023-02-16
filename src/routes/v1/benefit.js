const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("benefit");
});

module.exports = router;
