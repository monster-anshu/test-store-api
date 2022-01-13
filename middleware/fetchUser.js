const JWT = require("jsonwebtoken");
const JWT_SECRECT = "THIS_IS_SECRECT";

const fetchUser = (req, res, next) => {
    const authToken = req.header("authToken");
    if (!authToken)
    return res.status(401).send({
        err: "Unauthorized",
    });
    try {
        const data = JWT.verify(authToken, JWT_SECRECT);
        if (data.user == null)
        return res.status(401).send({
          err: "Unauthorized",
        });
        req.user = data.user;
        next();
    } catch (err) {
        return res.status(401).send({
            err: "Unauthorized",
    });
  }
};

module.exports = fetchUser;
