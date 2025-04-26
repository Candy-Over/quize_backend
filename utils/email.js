const nodemailer = require("nodemailer");

class EmailService {
  constructor({ user, pass, baseUrl }) {
    this.user = user;
    this.baseUrl = baseUrl;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.user,
        pass: pass,
      },
    });
  }

  async sendVerificationEmail(email, userId) {
    const mailOptions = {
      from: this.user,
      to: email,
      subject: "Email Verification",
      text: `Please verify your email by clicking the link: ${this.baseUrl}/auth/verify/${userId}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
