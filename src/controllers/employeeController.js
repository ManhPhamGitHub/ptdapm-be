const Employee = require("../models/employeeModel");
const Department = require("../models/departmentModel");
const Benefit = require("../models/benefitModel");

const employeeController = {
  createEmployee: async (req, res, next) => {
    const queryDepartment = req.query.department;
    const queryBenefit = req.query.benefit;

    try {
      const picturePath = req.files[0].filename;
      const {
        codeEmployee,
        name,
        email,
        address,
        BirthOfDate,
        gender,
        phoneNumber,
        position,
      } = req.body;

      const department = await Department.findById(queryDepartment);
      const benefit = await Benefit.findById(queryBenefit);

      const newEmployee = new Employee({
        codeEmployee,
        name,
        email,
        address,
        BirthOfDate,
        gender,
        phoneNumber,
        picturePath,
        position,
      });

      //==== add vào department ====
      if (department) {
        department.employeesId.push(newEmployee._id);

        const checkPosition = department.positions.find(
          (pos) => pos.name === position
        );

        console.log(checkPosition);
        if (!checkPosition) {
          const newPosition = {
            name: position,
            employeeId: [newEmployee._id],
          };

          department.positions.push(newPosition);
        } else {
          checkPosition.employeeId.push(newEmployee._id);
        }
        newEmployee.departMentId.push(department._id);
      }

      // ==== add benefit ====
      if (benefit) {
        benefit.beneficiariesId.push(newEmployee._id);
        newEmployee.benefitId.push(benefit._id);
      }

      await newEmployee.save();
      await benefit.save();
      await department.save();

      res.status(200).json("SUCCESS");
    } catch (err) {
      next(err);
    }
  },

  getEmployeePagination: async (req, res, next) => {
    const queryText = req.query.text;
    const queryDepartment = req.query.department;
    const queryPosition = req.query.position;

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
};

module.exports = employeeController;
