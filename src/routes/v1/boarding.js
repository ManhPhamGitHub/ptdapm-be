const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("boarding");
});

module.exports = router;
