const contractModel = require("../models/contractModel");


//DANG TEST CHWA DUNG DAU
exports.updateContract = async (req, res) => {
  try {
    // const contractCheck = await contractModel.findOne({ employeeId });
    const {contract_name, role, employeeId, contract_date, start_date, end_date, status, email, pdf_contract } = req.body;
    // if(contractCheck){
      //   return res
      //   .status(404)
      //   .json({ success: false, message: "Contract already exists" });
      // }
      const contract = new contractModel({
        employeesId: employeeId,
        contract_name:contract_name, 
        role:role, 
        contract_date:contract_date, 
        start_date:start_date, 
        end_date:end_date, 
        status:status, 
        email:email
      })
      const dataContract = await contract.save()
    return res
        .status(200)
        .json({ success: true, data: dataContract });
    // res.status(200).json({ success: true, message: "create contract success" });
  } catch (error) {
    res.send(error)
  }
}