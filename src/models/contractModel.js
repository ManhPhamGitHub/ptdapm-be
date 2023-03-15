const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
  {
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
    employeeId:{
      type: String,
      unique: true,
    },
    username: {
      type: String,
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
