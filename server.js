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
const multer = require('multer');
const upload = multer();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(upload.any()) 
// app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
