const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const { email, username, password, status, role } = req.body;

      // hash password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      //Create new user
      const newUser = new User({
        email,
        username,
        password: passwordHash,
        role,
        status,
      });

      //Save user to DB
      await newUser.save();
      return res.status(200).json({ status: true, msg: "Register Success" });
    } catch (err) {
      next(err);
    }
  },

  getUserPagination: async (req, res, next) => {
    const activePage = +req.query.page || 1;
    const limit = +req.query.limit || 5;

    const queryEmail = req.query.q;
    const queryRole = req.query.role;
    const queryStatus = req.query.status;

    const query = {}; // lưu các filter để query

    try {
      const userList = {};

      const startIndex = (activePage - 1) * limit;

      if (queryEmail) {
        query.email = { $regex: queryEmail, $options: "i" }; // lưu các filter email vào query
      }

      if (queryRole) {
        query.role = { $regex: queryRole, $options: "i" }; // lưu các filter role vào query
      }

      if (queryStatus) {
        query.status = { $regex: queryStatus, $options: "i" }; // lưu các filter status vào query
      }

      const totalRecord = await User.countDocuments(query); // length các query theo filter

      const totalPage = Math.ceil(totalRecord / limit); // tổng page

      userList.totalUser = totalRecord;
      userList.totalPage = totalPage;
      userList.activePage = activePage;

      userList.userList = await User.find(query) // find ra theo query
        .limit(limit)
        .skip(startIndex)
        .exec();

      return res.status(200).json(userList);
    } catch (err) {
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const queryChangePassword = req.query.changePassword;

      if (queryChangePassword) {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(id);
        // kiểm tra user
        if (!user) {
          return res.status(404).json({ message: "Incorrect User " });
        }

        // check password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: "Incorrect Password" });
        }

        // mã hóa password mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // lưu vào db
        user.password = hashedPassword;
        await user.save();

        res
          .status(200)
          .json({ status: true, msg: "Change password successfully" });
      } else {
        console.log(req.body);
        await User.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );

        res.status(200).json({ status: true, msg: "Update successfully" });
      }
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkUser = await User.findById(id);

      console.log(checkUser);
      if (checkUser.role.includes("Admin")) {
        res.status(404).json({
          status: true,
          msg: "This user is admin so it doesn't delete it",
        });
      } else {
        await User.findByIdAndDelete(id);
      }

      res.status(200).json({ status: true, msg: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
