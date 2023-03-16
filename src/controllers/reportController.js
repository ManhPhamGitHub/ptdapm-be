const employeeModel = require("../models/employeeModel");
const userModel = require("../models/userModel")

exports.reportEmployee = async (req, res) => {
    try {
        const dataUser = await userModel.find()
        const dataEmployee = await employeeModel.find()

        return res.status(200).json({ success: true, data: { dataUser, dataEmployee }});
    } catch (error) {
        console.log(error);
    }
}