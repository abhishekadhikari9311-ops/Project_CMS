const { users } = require("../../model/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.getRegisterPage = (req, res) => {
  res.render("register");
};

exports.postRegisterPage = async (req, res) => {
  const {
    UserName,
    UserEmail,
    UserPassword,
    UserPhoneNumber,
    ConfirmUserPassword,
  } = req.body;

  if (
    !UserName ||
    !UserEmail ||
    !UserPassword ||
    !ConfirmUserPassword ||
    !UserPhoneNumber
  ) {
    return res.status(400).send("please provide complete details");
  }

  //  checking or confirming password--------->

  const hashedPassword = bcrypt.hashSync(UserPassword, 12);

  // Check password confirmation
  if (UserPassword !== ConfirmUserPassword) {
    return res.status(400).send("Passwords do not match");
  }

  await users.create({
    UserName,
    UserEmail,
    UserPassword: hashedPassword,
    UserPhoneNumber,
  });

  return res.status(200).redirect("/user/get-users");
};

exports.getUsers = async (req, res) => {
  const fetchUsers = await users.findAll();
  console.log("fetch all the users:---", fetchUsers);

  res.render("users", { fetchUsers });
};

exports.getLoginPage = async (req, res) => {
  res.render("login");
};

exports.postLoginPage = async (req, res) => {
  const { userEmail, password } = req.body;

  if (!userEmail || !password) {
    return res.status(400).send("please provide all given details.......");
  }

  const userExists = await users.findOne({
    where: {
      userEmail: userEmail,
    },
  });

  console.log("userExists--------->", userExists);

  if (!userExists) {
    return res.status(400).send("user not found...");
  }

  const isPasswordMatch = bcrypt.compareSync(password, userExists.UserPassword);

  if (!isPasswordMatch) {
    return res.status(400).send("password didn't match ...........");
  }

  //  generates the token

  const token = jwt.sign(
    {
      id: userExists.id,
    },
    "jwtsecretkey",
    {
      expiresIn: "1d",
    },
  );

  //storing token in a cookie

  res.cookie("token", token);

  res.redirect("/blog/");
};

exports.logoutUsers = async (req, res) => {
  const { userId } = req;
  res.clearCookie("token");
  res.render("logout", {
    userId,
  });
};

exports.getForgotPassword = async (req, res) => {
  res.render("forgot-password");
};

exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;

  console.log("userEmail :--", email);

  if (!email) {
    return res.redirect("/user/forgot-password");
  }

  //  generating a random number

  const random_number = Math.floor(Math.floor(10000 * Math.random(99999)));

  console.log(random_number, "random number generation...........!");

  const data = {
    email,
    subject: "otp code sent..........!",
    text: "your otp code is:--->" + random_number,
  };

  const emailSent = await sendEmail(data);
  console.log("email sent successfully");

  res.send("otp sent successfully");
};
