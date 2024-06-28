const nodemail = require("nodemailer");

const sendEmail = async ({ emailTo, Subject, code, content }) => {
  const transporter = nodemail.createTransport({
    host: "nishanthsharma700053@gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "nishanthsharma700053@gmail.com",
      pass: "szhlpaturamrophu",
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
    <div>
    <p>Use this code${content}</p>
    </div>`,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
