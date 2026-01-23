const nodemailer = require('nodemailer');

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c40bd881516369",
    pass: "228359138ad095"
  }
});

// ✅ VERIFY SMTP CONNECTION (RUNS ON SERVER START)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Error:", error.message);
  } else {
    console.log("✅ SMTP Ready");
  }
});

const sendEmail = async ({to, subject, html }) => {
    await transporter.sendMail({
        from: `"Your App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    });
};

module.exports = sendEmail;

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "85369754f0dada",
    pass: "b76b13e306c93e"
  }
});