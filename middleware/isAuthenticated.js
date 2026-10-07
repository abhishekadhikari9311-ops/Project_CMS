const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { users } = require("../model/connection");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies; //  checking whether the token exists or not
    console.log("token---------->", token);

    if (!token) {
      return res.redirect("/user/login");
    }

    const verifiedToken = await promisify(jwt.verify)(token, "jwtsecretkey");
    console.log("verified token----------->", verifiedToken);

    const user = await users.findByPk(verifiedToken.id);

    console.log("user-------", user);

    if (!user) {
      return res.redirect("/user/login");
    }

    req.userId = user.id;

    next();
  } catch (err) {
    console.log("Authentication error:---------->", err);
    return res.status(500).send("invalid or expired token........!");
  }
};
