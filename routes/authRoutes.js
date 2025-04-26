const express = require("express");
const AuthController = require("../controllers/authController");
const AuthService = require("../services/authService");
const EmailService = require("../utils/email");
const uploadService = require("../services/uploadService");
const AuthMiddleware = require("../middleware/authMiddleware");

class AuthRouter {
  constructor() {
    this.router = express.Router();

    this.authMiddleware = new AuthMiddleware(process.env.JWT_SECRET);

    this.emailService = new EmailService({
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      baseUrl: process.env.BASE_URL,
    });

    this.authService = new AuthService(this.emailService);
    this.authController = new AuthController(this.authService, uploadService);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/register", this.authController.register);
    this.router.get("/verify/:userId", this.authController.verifyEmail);
    this.router.post("/login", this.authController.login);
    this.router.get(
      "/profile",
      this.authMiddleware.checkAuth.bind(this.authMiddleware),
      this.authController.getProfile
    );
    this.router.put(
      "/profile",
      this.authMiddleware.checkAuth.bind(this.authMiddleware),
      this.authController.editProfile
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AuthRouter;
