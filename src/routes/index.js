const express = require("express");
const routes = express.Router();

// Every api after that must be prefixed with /api/v1
routes.use('/api/v1', (req, res, err) => {
    res.status(200).json({
        success: true,
        message: "set up success",
      });
})

module.exports = routes;
