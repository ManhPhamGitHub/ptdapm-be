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

      default: new Date(),
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
      default: "",
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
    salary: [
      {
        rank: {
          type: Number,
          default: 1,
        },
        salaryBasic: {
          type: Number,
          default: 5000000,
        },
        actualSalary: {
          type: Number,
        },
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
