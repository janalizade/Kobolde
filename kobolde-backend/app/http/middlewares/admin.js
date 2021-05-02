const jwtDecode = require("jwt-decode");

module.exports = function (req, res, next) {
  let token = req.get("x-auth-token");
  let decoded = jwtDecode(token);
  let userRole = decoded.user.role;

  if (userRole !== "admin")
    return res.status(401).json({ message: "You are not an admin" });
  next();
};
