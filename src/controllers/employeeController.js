const Employee = require("../models/employeeModel");
const Department = require("../models/departmentModel");
const Benefit = require("../models/benefitModel");
const Contract = require("../models/contractModel");
const { unixDateToDate } = require("../utils");

const employeeController = {
  createEmployee: async (req, res, next) => {
    const queryDepartment = req.query.department;
    const queryBenefit = req.query.benefit;

    try {
      const picturePath = req?.files?.length > 0 ? req.files[0].name : null;
      const {
        codeEmployee,
        name,
        email,
        address,
        BirthOfDate,
        gender,
        phoneNumber,
        status,
        salaryRank,
        position,
      } = req.body;

      // VALIDATE EMAIL
      const existingEmployee = await Employee.findOne({
        email,
        is_deleted: false,
      });
      if (existingEmployee) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const employee = new Employee({
        codeEmployee,
        name,
        email,
        address,
        BirthOfDate,
        gender,
        phoneNumber,
        picturePath,
        salaryRank,
        status,
        position,
        departMentId: [queryDepartment],
        benefitId: [queryBenefit],
      });

      // ADD EMPLOYEE FOR DEPARTMENT AND BENEFIT
      await Department.findByIdAndUpdate(queryDepartment, {
        $addToSet: { employeesId: employee._id },
      });

      await Benefit.findByIdAndUpdate(queryBenefit, {
        $addToSet: { beneficiariesId: employee._id },
      });

      // CREATE CONTRACT
      const contract = await Contract.create({
        contract_name: `${employee.codeEmployee}-${employee.position}`,
        email: employee.email,
        employeeId: employee._id,
        position: employee.position,
      });
      employee.contractId = contract._id;

      await employee.save();

      res.status(200).json({ success: true, message: "Success" });
    } catch (err) {
      next(err);
    }
  },

  updateEmployee: async (req, res, next) => {
    const { employeeId } = req.params;
    const queryDepartment = req.query.department;
    const queryBenefit = req.query.benefit;

    try {
      const picturePath = req?.files?.length > 0 ? req.files[0].name : null;
      const {
        codeEmployee,
        name,
        email,
        address,
        BirthOfDate,
        gender,
        phoneNumber,
        status,
        salaryRank,
        position,
      } = req.body;

      let defaultEmp = {
        codeEmployee,
        name,
        email,
        address,
        BirthOfDate,
        gender,
        phoneNumber,
        picturePath,
        salaryRank,
        status,
        position,
      };

      let department = await Department.findById(queryDepartment);
      let benefit = await Benefit.findById(queryBenefit);

      const existingEmployee = await Employee.findOne({
        _id: { $ne: employeeId },
        email,
        // is_deleted: false,
      });
      if (existingEmployee) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const newDataEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { $set: defaultEmp },
        { new: true }
      );

      // Remove employee from previous department and benefit
      await Department.findByIdAndUpdate(newDataEmployee.departMentId, {
        $pull: { employeesId: employeeId },
      });
      await Benefit.findByIdAndUpdate(newDataEmployee.benefitId, {
        $pull: { beneficiariesId: employeeId },
      });

      // Add employee to new department and benefit
      newDataEmployee.departMentId = [queryDepartment];
      newDataEmployee.benefitId = [queryBenefit];
      department.employeesId.push(newDataEmployee._id);
      benefit.beneficiariesId.push(newDataEmployee._id);

      // Update contract email
      await Contract.updateOne(
        { employeeId },
        {
          $set: {
            contract_name: `${newDataEmployee.codeEmployee}-${newDataEmployee.position}`,
            email: newDataEmployee.email,
            employeeId: newDataEmployee._id,
            position: newDataEmployee.position,
          },
        }
      );

      await Promise.all([
        newDataEmployee.save(),
        department.save(),
        benefit.save(),
      ]);

      res.status(200).json({ success: true, message: "Success" });
    } catch (err) {
      next(err);
    }
  },

  getEmployeePagination: async (req, res, next) => {
    const queryText = req.query.text || "";
    const queryDepartment = req.query.department;
    const queryPosition = req.query.position;
    const activePage = +req.query.page || 1;
    const limit = +req.query.limit || 50;

    const query = {};
    try {
      const employeeList = {};

      const startIndex = (activePage - 1) * limit;

      query.is_deleted = { $eq: false };

      if (queryText) {
        query["$or"] = [{ name: { $regex: queryText, $options: "i" } }];
      }

      if (queryDepartment) {
        const department = await Department.findOne({
          name: { $regex: queryDepartment, $options: "i" },
        });
        query.departMentId = department?._id;
      }

      if (queryPosition) {
        query.position = { $regex: queryPosition, $options: "i" };
      }

      const totalRecord = await Employee.countDocuments(query);

      const totalPage = Math.ceil(totalRecord / limit); // tổng page

      employeeList.totalEmployee = totalRecord;
      employeeList.totalPage = totalPage;
      employeeList.activePage = activePage;

      employeeList.employeeList = await Employee.find(query)
        .populate("departMentId", "name")
        .sort({ createdAt: -1 }) // find ra theo query
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.status(200).json({ success: true, data: employeeList });
    } catch (err) {
      next(err);
    }
  },

  getDetailEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;

      const employeeDetail = await Employee.findById(id);

      res
        .status(200)
        .json({ success: true, data: employeeDetail })
        .populate("departMentId", "name");
    } catch (err) {
      next(err);
    }
  },

  deleteEmployee: async (req, res, next) => {
    try {
      const { id, contractId } = req.params;

      const employee = await Employee.findByIdAndUpdate(id, {
        $set: {
          is_deleted: true,
          departMentId: [],
          benefitId: [],
          position: "",
        },
      });

      await Department.updateMany(
        { employeesId: id },
        {
          $pull: {
            employeesId: id,
            "positions.$[].employeeId": id,
          },
        }
      );
      const contract = await Contract.findByIdAndUpdate(employee.contractId, {
        status: "cancelled",
      });
      res
        .status(200)
        .json({ success: true, message: "Delete employee Successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = employeeController;
