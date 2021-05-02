const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Permission not displayed" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (ex) {
    return res
      .status(401)
      .json({ message: "Permission not displayed" });
  }
};
