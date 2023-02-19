const Department = require("../models/departmentModel");

const departmentController = {
  createDepartment: async (req, res, next) => {
    try {
      const { code, name } = req.body;

      const department = new Department({
        code,
        name,
        departmentChair: null,
        employeesId: [],
        positions: [],
      });
      await department.save();
      res
        .status(200)
        .json({ status: true, msg: "create department successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = departmentController;
