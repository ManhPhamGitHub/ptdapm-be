const mongoose = require("mongoose");

const boarding = new mongoose.Schema(
  {
    boardingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    status:{
      type: Boolean,
      default: true
    }
  }
);

module.exports = mongoose.model("boarding", boarding);
