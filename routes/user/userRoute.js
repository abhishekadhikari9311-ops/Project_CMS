const {
  getRegisterPage,
  postRegisterPage,
  getUsers,
  getLoginPage,
  postLoginPage,
} = require("../../controller/user/userController");

const router = require("express").Router();

router.route("/register").get(getRegisterPage);

router.route("/register").post(postRegisterPage);

router.route("/login").get(getLoginPage).post(postLoginPage);

router.route("/get-users").get(getUsers);

module.exports = router;
