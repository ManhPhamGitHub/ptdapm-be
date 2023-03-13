const employeeModel = require("../models/employeeModel");
const userModel = require("../models/userModel");

exports.getReport = async (req, res) => {
    try {
        const dataUser = await userModel.find()
        const dataEmployee = await employeeModel.find()
        return res.status(200).json({ success: true, dataUser: [dataUser], dataEmployee: [dataEmployee] });
    } catch (error) {
        next(error);
    }
}