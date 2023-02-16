const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  serviceProvider: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endData: {
    type: Date,
    require: true,
  },
  signedByClient: {
    type: Boolean,
    default: false,
  },
  signedByServiceProvider: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
  },
  departmentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  status: {
    type: String,
    default: "unactive",
  },
});

module.exports = mongoose.model("Contract", contractSchema);
