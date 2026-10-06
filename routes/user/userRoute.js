const {
  getRegisterPage,
  postRegisterPage,
  getUsers,
} = require("../../controller/user/userController");

const router = require("express").Router();

router.route("/register").get(getRegisterPage);

router.route("/register").post(postRegisterPage);

router.route("/get-users").get(getUsers);

module.exports = router;