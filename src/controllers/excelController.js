const XLSX = require('xlsx')
const employeeModel = require('../models/employeeModel')
const REQUIRE_FIELDS = ['Mã nhân viên', 'Tên nhân viên', 'Email', 'Địa chỉ', 'Điện thoại']

const mapVietnameseKeysToModelsColumn = (key) => {
    switch(key) {
        case "Mã nhân viên":
            return "codeEmployee";
        case "Tên nhân viên":
            return "name";
        case "Email":
            return "email";
        case "Địa chỉ":
            return "address";
        case "Điện thoại":
            return "phoneNumber";
    }
}

const importExcel = async (req, res) => {
    try {
        let currentFile = req?.files?.[0]
        if(currentFile) {
            let wb = XLSX.readFile(currentFile.path)
            let ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            const recordKeys = Object.keys(ws?.[0]) || []
            const isValidRecord = REQUIRE_FIELDS.filter((key) => recordKeys.indexOf(key) > -1).length >= 5
            
            if(isValidRecord) {
                
                const buildDataToInsert = ws.map(record => {
                    return {
                        ...record,
                        [mapVietnameseKeysToModelsColumn(REQUIRE_FIELDS[0])]: record[REQUIRE_FIELDS[0]],
                        [mapVietnameseKeysToModelsColumn(REQUIRE_FIELDS[1])]: record[REQUIRE_FIELDS[1]],
                        [mapVietnameseKeysToModelsColumn(REQUIRE_FIELDS[2])]: record[REQUIRE_FIELDS[2]],
                        [mapVietnameseKeysToModelsColumn(REQUIRE_FIELDS[3])]: record[REQUIRE_FIELDS[3]],
                        [mapVietnameseKeysToModelsColumn(REQUIRE_FIELDS[4])]: record[REQUIRE_FIELDS[4]]
                    }
                })
                employeeModel.insertMany(buildDataToInsert, (err, data) => { 
                    if(!err) {
                        res.send({ success: true, data: data})
                    } else {
                        res.send({ success: false, err: err})
                    }
                })
            } else {
                res.send({ message: "test"})
            }
        } else {
            res.send({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại sau"})
        }
        
        
        // let arrFile = []
        // for (let i = 0; i < file.length; i++) {
        //     arrFile.push(file[i])
        //     let wb = XLSX.readFile(arrFile[i].path)
        //     let ws = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        //     let check = ws.filter((item)=>item.codeEmployee && item.name && item.email && item.address && item.gender && item.phoneNumber)
        //     employeeModel.insertMany(check, (err, data) => { 
        //         res.send(data)
        //     })
        // }
    } catch (error) {
        res.send(error)
    }
}
module.exports = { importExcel }