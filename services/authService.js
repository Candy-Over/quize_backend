const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail } = require("../utils/email");

class AuthService {
  constructor(emailService) {
    this.emailService = emailService;
  }

  async registerUser(userData) {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already in use.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      ...userData,
      password: hashedPassword,
      isVerified: false,
    });

    await user.save();
    await this.emailService.sendVerificationEmail(user.email, user._id);

    return user;
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password.");

    if (!user.isVerified) throw new Error("Please verify your email first.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { token };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");
    return user;
  }

  async editProfile(userId, updatedData) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");

    user.set(updatedData);
    await user.save();
    return user;
  }

  async verifyEmail(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found.");
    user.isVerified = true;
    await user.save();
    return user;
  }
}

module.exports = AuthService;
