const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];

const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Incorrect Email" });
      }
      const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCheck) {
        return res
          .status(404)
          .json({ success: false, message: "Incorrect Password" });
      }

      const accessToken = authController.generateAccessToken(user);
      //Generate refresh token
      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...more } = user._doc;
      res.status(200).json({ success: true, data: [{ ...more, accessToken }] });
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      console.log(req.cookies);
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken)
        return res
          .status(404)
          .json({ success: false, message: "You are not authenticated" });
      if (!refreshTokens.includes(refreshToken)) {
        return res
          .status(403)
          .json({ success: false, message: "Refresh token is not valid" });
      }
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          next(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        // tạo ra access, refresh token mới
        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);
        // lưu refresh token ms vào cookie
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          success: true,
          data: [
            {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            },
          ],
        });
      });
    } catch (err) {
      next(err);
    }
  },

  logOut: async (req, res, next) => {
    try {
      console.log(req.cookies);
      const refreshToken = req.cookies.refreshToken;

      // clear cookie khi logout
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      res.clearCookie("refreshToken");
      res
        .status(200)
        .json({ success: true, message: "Logged out successfully!" });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
