const contractModel = require("../models/contractModel");

exports.updateContract = async (req, res) => {
  try {
    const { contract_name, role, contract_date, start_date, end_date, status, email, id, pdf_contract } = req.body;
    const statusContract = await contractModel.findOne({ _id: id });
    if (status == statusContract.status && statusContract.status === "pending") {
      const dataContract = await contractModel.findByIdAndUpdate(
        id,
        { contract_name: contract_name },
        { role: role },
        { contract_date: contract_date },
        { start_date: start_date },
        { end_date: end_date },
        { status: "completed" },
        { email: email }
      )
      return res
        .status(200)
        .json({ success: true, data: dataContract })
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update" })
    }
  } catch (error) {
    res.send(error)
  }
}


exports.getContract = async (req, res) => {
  try {
    const dataContract = await contractModel.find();
    return res
      .status(200)
      .json({ success: true, data: dataContract })
  } catch (error) {
    res.send(error);
  }
};



exports.delContract = async (req, res) => {
  try {
    const id = req.params.id
    await contractModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: " Delete complete" })
  } catch (error) {
    res.send(error);
  }
};