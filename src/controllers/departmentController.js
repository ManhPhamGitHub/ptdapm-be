const Department = require("../models/departmentModel");
const Employee = require("../models/employeeModel");

const departmentController = {
  createDepartment: async (req, res, next) => {
    try {
      const { code, name } = req.body;

      const departmentCheck = await Department.findOne({ code });
      if (departmentCheck)
        return res.status(404).json("Department already exists");
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

  getDetailDepartment: async (req, res, next) => {
    try {
      const { id } = req.params;

      const departmentDetail = await Department.findById(id);

      res.status(200).json(departmentDetail);
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

      if (queryName) {
        query.name = { $regex: queryName, $options: "i" }; // lưu các filter email vào query
      }

      const totalRecord = await Department.countDocuments(query); // length các query theo filter

      const totalPage = Math.ceil(totalRecord / limit); // tổng page

      departmentList.totalUser = totalRecord;
      departmentList.totalPage = totalPage;
      departmentList.activePage = activePage;

      departmentList.departmentList = await Department.find(query) // find ra theo query
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json(departmentList);
    } catch (err) {
      next(err);
    }
  },

  deleteDepartment: async (req, res, next) => {
    try {
      console.log("vo");
      const { id } = req.params;

      await Department.findById(id)
        .then((department) => {
          if (!department) {
            res.status(404).json("Department not found");
          }
          return department.deleteOne();
        })
        .then(() => {
          return Employee.updateMany(
            { departMentId: id },
            {
              $pull: { departMentId: id },
              $set: { position: "" },
            }
          );
        })
        .then(() => {
          res.status(200).json("SUCCESS");
        });
    } catch (err) {
      next(err);
    }
  },

  updateDepartment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateDepartment = await Department.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json({ status: true, msg: "Success" });
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
            res.status(404).json("Department not found");
          }
          const updatedEmployees = department.employeesId.filter(
            (e) => e._id.toString() !== employeeId
          );
          department.employeesId = updatedEmployees;

          // return department.save();
        })
        .then(() => {
          // return Employee.updateOne(
          //   { _id: employeeId },
          //   {
          //     $pull: { departMentId: departmentId },
          //     $set: { position: "" },
          //   }
          // );
        });

      res.status(200).json("SUCCESS");
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
        return res.status(404).json("Department already exists");

      const newPosition = {
        name,
        employeeId: [],
      };

      department.positions.push(newPosition);

      await department.save();

      res.status(200).json({ status: true, msg: "Add position successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = departmentController;
