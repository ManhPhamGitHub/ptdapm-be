var XLSX = require('xlsx')
var excelModal = require('../models/excelModel')
const excel = async (req, res) => {
    try {
        let file = req.files
        let arrFile = []
        for (let i = 0; i < file.length; i++) {
            arrFile.push(file[i])
            let wb = XLSX.readFile(arrFile[i].path)
            let ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            excelModal.insertMany(ws, (err, data) => {  
                res.send(data)
            })
        }
    } catch (error) {
        res.send(error)
    }
}
module.exports = { excel }