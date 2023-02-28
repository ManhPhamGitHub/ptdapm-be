var XLSX = require('xlsx')
const employeeModel = require('../models/employeeModel')
const importExcel = async (req, res) => {
    try {
        let file = req.files
        let arrFile = []
        for (let i = 0; i < file.length; i++) {
            arrFile.push(file[i])
            let wb = XLSX.readFile(arrFile[i].path)
            let ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            let check = ws.filter((item)=>item.codeEmployee && item.name && item.email && item.address && item.gender && item.phoneNumber)
            employeeModel.insertMany(check, (err, data) => { 
                res.send(data)
            })
        }
    } catch (error) {
        res.send(error)
    }
}
module.exports = { importExcel }