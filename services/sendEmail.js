const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(UserEmail) {
  //  logic to send email goes here ------------>

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.emailAppPassword,
    },
  });

  const mailOptions = {
    from: "Abhishek Adhikari <abhishekadhikari982@gmail.com> ",
    to: UserEmail,
    subject: "your otp:---->",
    text: "your otp is:" + "5698ghjju",
  };

  await transporter.sendMail(mailOptions);

  return transporter;
}

module.exports = sendEmail;
