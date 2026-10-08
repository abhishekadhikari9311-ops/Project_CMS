const {
  getRegisterPage,
  postRegisterPage,
  getUsers,
  getLoginPage,
  postLoginPage,
  logoutUsers,
} = require("../../controller/user/userController");
const { isAuthenticated } = require("../../middleware/isAuthenticated");

const router = require("express").Router();

router.route("/register").get(getRegisterPage);

router.route("/register").post(postRegisterPage);

router.route("/login").get(getLoginPage).post(postLoginPage);

router.route("/get-users").get(getUsers);

router.route("/logout").get(isAuthenticated, logoutUsers);

module.exports = router;
