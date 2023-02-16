const mongoose = require("mongoose");

const onBoarding = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  startDate: {
    type: Date,
    require: true,
  },
});

const offBoarding = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  departureDate: {
    type: Date,
    require: true,
  },
  reason: {
    type: String,
  },
  feedback: {
    type: String,
  },
});

const Boarding = new mongoose.Schema({
  onBoarding: [onBoarding],
  offBoarding: [offBoarding],
});

module.exports = mongoose.model("Boarding", Boarding);
