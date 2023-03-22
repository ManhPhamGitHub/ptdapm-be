const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    contract_name: {
      type: String,
    },
    role: {
      type: String,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    contract_date: { // Ngày ký hợp đồng.
      type: Date,
      default:new Date()
    },
    start_date: { // Ngày bắt đầu hiệu lực của hợp đồng.
      type: Date
    },
    end_date: { // Ngày kết thúc hiệu lực của hợp đồng.
      type: Date
    },
    status: {
      type: String,
      enum: ["pending", "cancelled", "completed"],
      default: "pending"
    },
    email: {
      type: String,
      unique: true,
    },
    pdf_contract: {
      type: String,
      default: ''
    }
  },
);

module.exports = mongoose.model("Contract", contractSchema);