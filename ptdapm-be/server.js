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
const path = require("path");
const app = express();
const multer = require("multer");

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let diskStore = multer.diskStorage({
  destination: (_, ___, cb) => {
    cb(null, path.join(__dirname, "/dummy-files"));
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: diskStore }).any();
app.use(upload);
// app.use(express.static('public'));

const routes = require("./src/routes/index");
app.use(routes);
app.use(morgan("common"));
app.use(cookieParser());

// Error handler
app.all("*", (req, res, next) => {
  const error = new Error("Route not found !!!");
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
