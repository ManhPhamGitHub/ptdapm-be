require("dotenv").config();

// Connect database
const { connectDatabase } = require("./src/configs/database");
connectDatabase();
const errorHandler = require("./src/middlewares/errorHandler");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const { fileURLToPath } = require("url");
const path = require("path");
const upload = require("./src/middlewares/fileUpload.js");
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cookieParser());

// multer
app.use(upload.any());
app.use("/uploads", express.static(path.join(__dirname, "/src/public/image")));

// Routing app
app.use(require("./src/routes/index"));

// Error handler
app.all("*", (req, res, next) => {
  const error = new Error("Route not found !!!");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`Server is running on port: ${PORT}`);
});
