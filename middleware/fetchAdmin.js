const JWT = require("jsonwebtoken");
const JWT_SECRECT = "THIS_IS_SECRECT";

const fetchAdmin = (req, res, next) => {
  const authToken = req.header("authToken");
  if (!authToken)
    return res.status(401).json({
      err: "Unauthorized",
    });
  try {
    const data = JWT.verify(authToken, JWT_SECRECT);
    if (data.admin == null)
      return res.status(401).json({
        err: "Unauthorized",
      });
    req.admin = data.admin;
    next();
  } catch (err) {
    return res.status(401).json({
      err: "Unauthorized",
    });
  }
};

module.exports = fetchAdmin;
