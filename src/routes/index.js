const express = require("express");
const routes = express.Router();
const employeeRoute = require("./v1/employee.js");
const departmentRoute = require("./v1/department.js");
const authRoute = require("./v1/auth.js");
const benefitRoute = require("./v1/benefit.js");
const boardingRoute = require("./v1/boarding.js");
const contractRoute = require("./v1/contract.js");

// Every api after that must be prefixed with /api/v1

//auth
routes.use("/api/v1/auth", authRoute);
//employee
routes.use("/api/v1/employees", employeeRoute);
//department
routes.use("/api/v1/departments", departmentRoute);
//benefit
routes.use("/api/v1/benefits", benefitRoute);
//boarding
routes.use("/api/v1/boardings", boardingRoute);
//contract
routes.use("/api/v1/contracts", contractRoute);

module.exports = routes;
