const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  employeeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  // salary: [
  //   {
  //     rank: {
  //       type: Number,
  //       default: 1,
  //     },
  //     salaryBasic: {
  //       type: Number,
  //       default: 5000000,
  //     },
  //     actualSalary: {
  //       type: Number,
  //     },
  //   },
  // ],
});

const departmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    departmentChair: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    employeesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    positions: [positionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);
