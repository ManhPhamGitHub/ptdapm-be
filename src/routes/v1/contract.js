const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("contract test 123321");
});

module.exports = router;
