const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("contract");
});

module.exports = router;
