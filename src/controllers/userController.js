const User = require("../models/userModel.js");

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const { email, username, status, role } = req.body;

      //Create new user
      const newUser = new User({
        email,
        username,
        role,
        status,
      });

      //Save user to DB
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
