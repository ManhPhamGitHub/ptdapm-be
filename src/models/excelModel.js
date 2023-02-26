var mongoose = require('mongoose')
var excelModal = mongoose.Schema({
    name:String,
    age:Number
})
module.exports = mongoose.model('excelModal',excelModal)