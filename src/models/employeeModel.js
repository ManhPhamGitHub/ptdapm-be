const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    codeEmployee: {
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
    picturePath: {
      type: String,
    },
    phoneNumber: {
      type: String,
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
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
