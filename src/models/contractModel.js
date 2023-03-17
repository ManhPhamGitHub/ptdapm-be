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
      type: Date
    },
    start_date: { // Ngày bắt đầu hiệu lực của hợp đồng.
      type: Date
    },
    end_date: { // Ngày kết thúc hiệu lực của hợp đồng.
      type: Date
    },
    status: {
      enum: ["pending", "cancelled", "complete"]
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