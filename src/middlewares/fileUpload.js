const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/public/image");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
