const contractModel = require("../models/contractModel");
const { unixDateToDate } = require("../utils")
exports.updateContract = async (req, res) => {
  try {
    const id = req.params.id
    if (req.method == "DELETE") {
      await contractModel.findByIdAndUpdate({ _id: id }, { status: "cancelled" });
      const dataContract = await contractModel.find({ status: { $in: ["pending", "completed"] } });
      return res
        .status(200)
        .json({ success: true, data: dataContract, message: " Delete complete" })
    } else if (req.method == "PUT") {
      const { contract_name, role, contract_date, start_date, end_date, status, email } = req.body;
      const statusContract = await contractModel.findOne({ _id: id });
      if (status === statusContract.status && statusContract.status === "pending") {
        const dataToUpdate = {
          contract_name,
          role,
          contract_date,
          start_date: unixDateToDate(start_date),
          end_date: unixDateToDate(end_date),
          status: "completed",
          email
        };
        await contractModel.findByIdAndUpdate({ _id: id }, dataToUpdate);
        const dataContract = await contractModel.find({ status: { $in: ["pending", "completed"] } });
        return res
          .status(200)
          .json({ success: true, data: dataContract, message: " Update complete" })
      }
      else {
        return res
          .status(500)
          .json({ success: false, message: "Action failed" })
      }
    }
  } catch (error) {
    res.send(error)
  }
}


exports.getContract = async (req, res) => {
  try {
    if (!req.query.contract_name && !req.query.status) {
      var dataContract = await contractModel.find({ status: { $in: ["pending", "completed"] } });
    } else {
      const contract_name = req.query.contract_name;
      const status = req.query.status;
      var dataContract = await contractModel.find({
        $or: [
          { contract_name: { $regex: contract_name, $options: "i" } },
          { status: status }
        ]
      })
    }
    return res
      .status(200)
      .json({ success: true, data: dataContract })
  } catch (error) {
    res.send(error);
  }
};