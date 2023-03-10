const employeeModel = require("../models/employeeModel");

exports.updateBoarding = async (req, res) => {
    try {
        const {status} = req.body;
        await employeeModel.findByIdAndUpdate(req.params.boardingId, { status:status })
        res.send(res.status(200).json({ success: true, message: "update boarding success" }))
    } catch (error) {
        next(error);
    }
}




