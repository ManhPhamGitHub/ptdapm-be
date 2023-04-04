const Department = require("../models/departmentModel");
const Employee = require("../models/employeeModel");

const departmentController = {
  createDepartment: async (req, res, next) => {
    try {
      const { code, name } = req.body;
      const departmentCheck = await Department.findOne({ code });
      const isAlreadyHaveDepartmentName = await Department.findOne({ name });
      if (departmentCheck || isAlreadyHaveDepartmentName)
        return res
          .status(404)
          .json({ success: false, message: "Department already exists" });
      const department = new Department({
        code,
        name,
        employeesId: [],
        positions: [],
      });
      await department.save();
      res.status(200).json({ success: true, data: department });
    } catch (err) {
      next(err);
    }
  },

  getDetailDepartment: async (req, res, next) => {
    try {
      const { id } = req.params;

      const departmentDetail = await Department.findById(id);

      res.status(200).json({ success: true, data: departmentDetail });
    } catch (err) {
      next(err);
    }
  },

  getAllDepartment: async (req, res, next) => {
    const activePage = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const queryName = req.query.name;

    const query = {};

    try {
      const departmentList = {};

      const startIndex = (activePage - 1) * limit;

      query.is_deleted = { $eq: false };

      if (queryName) {
        query.name = { $regex: queryName, $options: "i" }; // lưu các filter email vào query
      }

      const totalRecord = await Department.countDocuments(query); // length các query theo filter

      const totalPage = Math.ceil(totalRecord / limit); // tổng page

      departmentList.totalUser = totalRecord;
      departmentList.totalPage = totalPage;
      departmentList.activePage = activePage;

      departmentList.departmentList = await Department.find(query)
        .sort({ createdAt: -1 }) // find ra theo query
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json({ success: true, data: departmentList });
    } catch (err) {
      next(err);
    }
  },

  deleteDepartment: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deleteDepartment = {
        $set: {
          is_deleted: true,
          employeesId: [],
          "positions.$[].employeeId": [],
        },
      };

      await Department.findByIdAndUpdate(id, deleteDepartment).then(() => {
        return Employee.updateMany(
          { departMentId: id },
          {
            $pull: { departMentId: id },
            $set: { position: "" },
          }
        );
      });

      res
        .status(200)
        .json({ success: true, message: "Delete Department Successfully" });
    } catch (err) {
      next(err);
    }
  },

  updateDepartment: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Department.findByIdAndUpdate(
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
        .json({ success: true, message: "update department successfully" });
    } catch (err) {
      next(err);
    }
  },

  deleteEmployeeForDepartment: async (req, res, next) => {
    try {
      const { departmentId, employeeId } = req.params;
      await Department.findById(departmentId)
        .populate("employeesId")
        .then((department) => {
          if (!department) {
            res
              .status(404)
              .json({ success: false, message: "Department not found" });
          }

          // delete employeeId cuar department
          const updatedEmployees = department.employeesId.filter(
            (e) => e._id.toString() !== employeeId
          );
          department.employeesId = updatedEmployees;

          // delete employeeId cuar position
          const positionOfEm = department.positions.find((pos) =>
            pos.employeeId.includes(employeeId)
          );

          if (positionOfEm) {
            const index = positionOfEm.employeeId.indexOf(employeeId);
            if (index !== -1) {
              positionOfEm.employeeId.splice(index, 1);
            }
          }

          return department.save();
        })
        .then(() => {
          return Employee.updateOne(
            { _id: employeeId },
            {
              $pull: { departMentId: departmentId },
              $set: { position: "" },
            }
          );
        });

      res
        .status(200)
        .json({ status: true, message: "Delete employee successfully" });
    } catch (err) {
      next(err);
    }
  },

  addPosition: async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const { name } = req.body;

      const department = await Department.findById(departmentId);

      const checkPosition = department.positions.find(
        (pos) => pos.name === name
      );
      if (checkPosition)
        return res
          .status(404)
          .json({ success: false, message: "Position already exists" });

      const newPosition = {
        name,
        employeeId: [],
      };

      department.positions.push(newPosition);

      await department.save();

      res
        .status(200)
        .json({ success: true, message: "Add position successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = departmentController;
