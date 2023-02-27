const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

// const verifyTokenAndUserAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (
//       req.user.role === "Employee" ||
//       req.user.role === "HR" ||
//       req.user.role === "Admin"
//     ) {
//       next(err);
//     } else {
//       res.status(403).json("You're not allowed to do that!");
//     }
//   });
// };

const verifyTokenAndHR = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role.includes("Admin") && req.user.role.includes("HR")) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user.role.includes("Admin")) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  // verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndHR,
};
