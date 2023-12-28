const express = require('express');
const router = express.Router();

const filesService = require('../../middlewares/services/aws');
router.get('/aws-generate-url', async (req, res) => {
    const {filename, path} = req.query;
    const urls = await filesService.generateUrl(filename, path);

    res.send({urls});
})

module.exports = router;