const { users } = require("../../model/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.getRegisterPage = (req, res) => {
  const error = req.flash("error");
  res.render("register", { error });
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
  const error = req.flash("error");
  res.render("login", { error });
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
    req.flash("error", "user not found...");
    res.redirect("/user/register");
  }

  const isPasswordMatch =await bcrypt.compare(password, userExists.UserPassword);

  if (!isPasswordMatch) {
    req.flash("error", "email and password didn't match ...........");
    res.redirect("/user/login");
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

  const random_number = Math.floor(10000 + Math.random() * 90000);

  console.log(random_number, "random number generation...........!");

  // getting the user info...............

  const userData = await users.findOne({
    where: { UserEmail: email },
  });

  console.log("user data-------->", userData);

  if (!userData) {
    return res.status(404).send("User with this email does not exist.");
  }

  const data = {
    email,
    subject: "otp code sent..........!",
    text: "your otp code is:--->" + random_number,
  };

  await sendEmail(data);
  console.log("email sent successfully");

  // adding the otp to the given user table-------------->

  userData.OTP = random_number;

  userData.otpGeneratedTime = Date.now();

  await userData.save();

  res.redirect("/user/otp-verify/" + encodeURIComponent(email));
};

exports.renderOtpForm = async (req, res) => {
  const { email } = req.params;
  res.render("otpForm", {
    email,
  });
};

exports.verifyOtpForm = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.params;
  const userData = await users.findOne({
    where: {
      OTP: otp,
      UserEmail: email,
    },
  });
  if (!userData) {
    return res.send("user with the given otp and email not found...........");
  }

  const currentTime = Date.now();

  const otpGeneratedTime = userData.otpGeneratedTime;

  if (currentTime - otpGeneratedTime > 7200000) {
    return res.send("otp has expired..........!!!");
  }

  return res.redirect(`/user/reset-password?email=${email}&otp=${otp} `);
};

exports.renderResetPassword = async (req, res) => {
  const { otp, email } = req.query;
  res.render("resetPassword", {
    otp,
    email,
  });
};

exports.handleResetPassword = async (req, res) => {
  const { otp, email } = req.params;

  const { newPassword, confirmNewPassword } = req.body;

  if (!otp || !email || !newPassword || !confirmNewPassword) {
    return res
      .status(400)
      .send("please provide all the given requirements..........!");
  }

  if (newPassword !== confirmNewPassword) {
    return res
      .status(400)
      .send("please provide the matched password...........!!!!!");
  }

  const hashedPassword = bcrypt.hashSync(newPassword, 12);

  const userData = await users.findOne({
    where: {
      UserEmail: email,
      OTP: otp,
    },
  });

  if (!userData) {
    return res
      .status(400)
      .send("users not found with the given otp and email.........!");
  }

  //  explaining for otp  expiration case scenario

  const currentTime = Date.now();

  const otpGeneratedTime = userData.otpGeneratedTime;

  if (currentTime - otpGeneratedTime > 7200000) {
    return res.send("invalid or expired otp");
  }

  //  updating the password
  userData.UserPassword = hashedPassword;

  await userData.save();

  res.redirect("/blog/register");
};