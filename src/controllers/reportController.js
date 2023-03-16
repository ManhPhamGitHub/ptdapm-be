const employeeModel = require("../models/employeeModel");
const userModel = require("../models/userModel")

exports.reportEmployee = async (req, res) => {
    try {
        let totalEmployee = [0,0,0,0,0,0,0,0,0,0,0,0]
        const label_month = [1,2,3,4,5,6,7,8,9,10,11,12]
        const { year } = req.query;
        const employees = await employeeModel.find({
            startDate:{
                $gte:new Date(year,1,1),
                $lt: new Date(year,12,31)
            }
        })
        employees.filter((employee)=>{
            const monthOfEmployee = +employee.startDate.toISOString().split('-')[1]
            totalEmployee[monthOfEmployee-1] +=1
        })
        const data ={
            label_month,
            totalEmployee
        }
        res.status(200).json({ success: true, message: "get report success" ,data})
    } catch (error) {
        console.log(error);
    }
}