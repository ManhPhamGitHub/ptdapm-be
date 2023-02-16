const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  BirthOfDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  departMentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  position: {
    type: String,
    required: true,
  },
  benefitId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benefit",
    },
  ],
  contractId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
  ],
  salary: {
    type: Number,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unactive",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
