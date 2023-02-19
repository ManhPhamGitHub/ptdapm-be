const Benefit = require("../models/benefitModel.js");

const benefitController = {
  createBenefit: async (req, res, next) => {
    try {
      const { name, description, standardLeave, month, status } = req.body;
      const benefit = await Benefit.create({
        name,
        description,
        standardLeave,
        month,
        status,
      });
      res.status(201).json({ success: true, data: benefit });
    } catch (err) {
      next(err);
    }
  },

  addHolidayToBenefit: async (req, res, next) => {
    try {
    } catch (err) {}
  },
};

module.exports = benefitController;
