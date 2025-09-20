const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //   define mail options
  const mailOptions = {
    from: "Apollo Chatbot <no-reply@apollochatbot.com>",
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  //   send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
