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
    },
    address: {
      type: String,
      required: true,
    },
    BirthOfDate: {
      type: Date,
    },
    gender: {
      type: String,
      required: true,
      default: "nam",
    },
    picturePath: {
      type: String,
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
      default: "Giảng viên",
    },
    benefitId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Benefit",
      },
    ],
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },

    salaryRank: {
      type: Number,
      default: 1,
    },
    is_onBoar: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "inActive", "onBoarding", "offBoarding"],
      default: "active",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
