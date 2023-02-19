const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    startData: {
      type: Date,
    },
    endData: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const benefitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    standardLeave: {
      // số ngày nghỉ
      type: Number,
    },
    month: {
      type: Number,
    },
    beneficiariesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    holiday: [holidaySchema],
    status: {
      type: String,
      default: "unactive",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Benefit", benefitSchema);
