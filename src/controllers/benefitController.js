const Benefit = require("../models/benefitModel.js");
const Employee = require("../models/employeeModel.js");

const benefitController = {
  createBenefit: async (req, res, next) => {
    try {
      const { name, description, standardLeave, month, status } = req.body;
      const checkBenefit = await Benefit.findOne({ name });
      if (checkBenefit)
        return res
          .status(404)
          .json({ success: false, message: "Benefit already exists" });
      const createdUser = await Benefit.create({
        name,
        description,
        standardLeave: +standardLeave || 0,
        month,
        status,
      });
      res.status(200).json({ success: true, message: "Success", data: createdUser});
    } catch (err) {
      next(err);
    }
  },

  getAllBenefits: async (req, res, next) => {
    const queryName = req.query.name;

    const activePage = +req.query.page || 1;
    const limit = +req.query.limit || 50;

    const query = {};
    try {
      const benefitList = {};

      if (queryName) {
        query.name = { $regex: queryName, $options: "i" };
      }

      const startIndex = (activePage - 1) * limit;
      const totalRecord = await Benefit.countDocuments(query); // length các query theo filter
      const totalPage = Math.ceil(totalRecord / limit);

      benefitList.totalUser = totalRecord;
      benefitList.totalPage = totalPage;
      benefitList.activePage = activePage;

      benefitList.benefitList = await Benefit.find(query)
        .sort({ createdAt: -1 }) // find ra theo query
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json({ success: true, data: benefitList });
    } catch (err) {
      next(err);
    }
  },

  getDetailBenefit: async (req, res, next) => {
    try {
      const { id } = req.params;

      const benefit = await Benefit.findById(id);

      res.status(200).json({ success: true, data: benefit });
    } catch (err) {
      next(err);
    }
  },

  addAndRemoveHolidayToBenefit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const queryDelete = req.query.delete;
      const benefit = await Benefit.findById(id);
      const { name, startDate, endDate, description } = req.body;
      const newHoliday = {
        name,
        startDate,
        endDate,
        description,
      };

      if (queryDelete) {
        const holidayFilter = benefit?.holiday.filter(
          (holi) => holi.name !== name
        );

        await benefit.updateOne({ $set: { holiday: holidayFilter } });
        res
          .status(200)
          .json({ success: true, message: "holiday delete successfully" });
      } else {
        const checkHoliday = benefit.holiday.find(
          (holi) => holi.name === newHoliday.name
        );

        if (checkHoliday) {
          res
            .status(404)
            .json({ success: false, message: "holiday already exists" });
        }

        benefit.holiday.push(newHoliday);

        benefit.save();
        res
          .status(200)
          .json({ success: true, message: "Add holiday successfully" });
      }
    } catch (err) {
      next(err);
    }
  },

  updateBenefit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateBenefit = await Benefit.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res
        .status(200)
        .json({ success: true, message: "update benefit successfully" });
    } catch (err) {
      next(err);
    }
  },

  deleteBenefit: async (req, res, next) => {
    try {
      const { id } = req.params;

      await Benefit.findByIdAndUpdate(id, {
        is_deleted: true,
        beneficiariesId: [],
      })
        .then(() => {
          return Employee.updateMany(
            { benefitId: id },
            { $pull: { benefitId: id } }
          );
        })
        .then(() => {
          res
            .status(200)
            .json({ success: true, message: "delete benefit successfully" });
        });
    } catch (err) {
      next(err);
    }
  },

  updateHoliday: async (req, res, next) => {
    try {
      const { benefitId, holidayId } = req.params;

      const { name, startDate, endDate, description } = req.body;

      const filterBenefit = { _id: benefitId, "holiday._id": holidayId };

      const updateHoliday = {
        $set: {
          "holiday.$.name": name,
          "holiday.$.description": description,
          "holiday.$.startDate": startDate,
          "holiday.$.endDate": endDate,
        },
      };

      await Benefit.findOneAndUpdate(filterBenefit, updateHoliday);

      res
        .status(200)
        .json({ success: true, message: "update holiday successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = benefitController;
