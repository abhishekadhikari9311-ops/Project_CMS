const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(data) {
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
    to: data.email,
    subject: data.subject,
    text: data.text,
  };

  await transporter.sendMail(mailOptions);

  return transporter;
}

module.exports = sendEmail;
