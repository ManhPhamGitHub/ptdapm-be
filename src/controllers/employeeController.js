const Employee = require("../models/employeeModel");
const Department = require("../models/departmentModel");
const Benefit = require("../models/benefitModel");
const { populate } = require("../models/departmentModel");

const employeeController = {
  createEmployee: async (req, res, next) => {
    const queryDepartment = req.query.department;
    const queryBenefit = req.query.benefit;
    const queryPosition = req.query.position;

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
      } = req.body;

      let department = null;
      let benefit = null;

      let employee = await Employee.findOne({ codeEmployee });
      if (!employee) {
        employee = new Employee({
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
        });
      } else {
        employee.name = name;
        employee.email = email;
        employee.address = address;
        employee.BirthOfDate = BirthOfDate;
        employee.gender = gender;
        employee.phoneNumber = phoneNumber;
        employee.picturePath = picturePath;
        employee.status = status;
        employee.salaryRank = salaryRank;
      }

      const oldDepartment = await Department.findById(employee.departMentId);
      if (oldDepartment) {
        const index = oldDepartment.employeesId.indexOf(employee._id);

        if (index !== -1) {
          oldDepartment.employeesId.splice(index, 1);
          await oldDepartment.save();
        }

        const oldPosition = oldDepartment.positions.find((pos) =>
          pos.employeeId.includes(employee._id)
        );

        if (oldPosition) {
          const index = oldPosition.employeeId.indexOf(employee._id);
          if (index !== -1) {
            oldPosition.employeeId.splice(index, 1);
            await oldDepartment.save();
          }
        }
      }

      const oldBenefit = await Benefit.findById(employee.benefitId);
      if (oldBenefit) {
        const index = oldBenefit.beneficiariesId.indexOf(employee._id);

        if (index !== -1) {
          oldBenefit.beneficiariesId.splice(index, 1);
          await oldBenefit.save();
        }
      }

      // Xử lý department
      if (queryDepartment) {
        department = await Department.findById(queryDepartment);

        if (!department)
          return res.status(400).json({ message: "Department not found" });

        if (!department.employeesId.includes(employee._id)) {
          department.employeesId.push(employee._id);
        }

        const checkPosition = department.positions.find(
          (pos) => pos.id === queryPosition
        );

        if (!checkPosition?.employeeId.includes(employee._id)) {
          checkPosition?.employeeId.push(employee._id);
        }
        employee.position = checkPosition?.name;

        if (!employee.departMentId.includes(department?._id)) {
          employee.departMentId = department._id;
        }
      }

      // Xử lý benefit
      if (queryBenefit) {
        benefit = await Benefit.findById(queryBenefit);

        if (!benefit) {
          return res.status(400).json({ message: "Benefit not found" });
        }

        if (!benefit.beneficiariesId.includes(employee._id)) {
          benefit.beneficiariesId.push(employee._id);
          employee.benefitId = benefit._id;
        }
      }

      await employee.save();
      if (department) await department.save();
      if (benefit) await benefit.save();

      res.status(200).json("SUCCESS");
    } catch (err) {
      next(err);
    }
  },

  getEmployeePagination: async (req, res, next) => {
    const queryText = req.query.text;
    const queryDepartment = req.query.department;
    const queryPosition = req.query.position;
    const queryDelete = req.query.is_deleted;

    const activePage = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const query = {};
    try {
      const employeeList = {};

      const startIndex = (activePage - 1) * limit;

      if (queryText) {
        query["$or"] = [
          { name: { $regex: queryText, $options: "i" } },
          { email: { $regex: queryText, $options: "i" } },
        ];
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

      if (queryDelete) {
        query.is_deleted = { $eq: queryDelete };
      }

      const totalRecord = await Employee.countDocuments(query);

      const totalPage = Math.ceil(totalRecord / limit); // tổng page

      employeeList.totalEmployee = totalRecord;
      employeeList.totalPage = totalPage;
      employeeList.activePage = activePage;

      employeeList.employeeList = await Employee.find(query)
        .populate("departMentId", "name") // find ra theo query
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.status(200).json(employeeList);
    } catch (err) {
      next(err);
    }
  },

  getDetailEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;

      console.log(id);

      const employeeDetail = await Employee.findById(id);

      console.log(employeeDetail);

      res.status(200).json(employeeDetail);
    } catch (err) {
      next(err);
    }
  },

  deleteEmployee: async (req, res, next) => {
    try {
      const { id } = req.params;

      await Employee.findByIdAndUpdate(id, {
        $set: {
          is_deleted: true,
          departMentId: [],
          benefitId: [],
          position: "",
        },
      }).then(() => {
        return Department.updateMany(
          {
            employeesId: id,
          },
          {
            $pull: {
              employeesId: id,
              "positions.$[].employeeId": id,
            },
          }
        );
      });

      res
        .status(200)
        .json({ status: true, msg: "Delete employee Successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = employeeController;
