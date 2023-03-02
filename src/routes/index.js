const express = require("express");
const routes = express.Router();
const employeeRoute = require("./v1/employee.js");
const departmentRoute = require("./v1/department.js");
const authRoute = require("./v1/auth.js");
const benefitRoute = require("./v1/benefit.js");
const boardingRoute = require("./v1/boarding.js");
const contractRoute = require("./v1/contract.js");
const userRoute = require("./v1/user.js");
const servicesRoute = require("./v1/services");
const sendMailRoute = require('./v1/sendMail')
const reportRoute = require("./v1/report")
// Every api after that must be prefixed with /api/v1

//auth
routes.use("/api/v1/auth", authRoute);

//auth
routes.use("/api/v1/users", userRoute);

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

//sendMail
routes.use("/api/v1/sendmail", sendMailRoute);

//services
routes.use("/api/v1/services", servicesRoute);

//report
routes.use("/api/v1/report", reportRoute)

module.exports = routes;
