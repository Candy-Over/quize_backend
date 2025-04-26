const express = require("express");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const AnswerService = require("../services/answerService");
const AnswerController = require("../controllers/answerController");
const AuthMiddleware = require("../middleware/authMiddleware");

class AnswerRoutes {
  constructor() {
    this.router = express.Router();

    this.authMiddleware = new AuthMiddleware(process.env.JWT_SECRET);
    this.answerService = new AnswerService({
      AnswerModel: Answer,
      QuestionModel: Question,
    });
    this.answerController = new AnswerController(this.answerService);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/",
      this.authMiddleware.checkAuth.bind(this.authMiddleware),
      this.answerController.submitAnswer.bind(this.answerController)
    );

    this.router.get(
      "/search",
      this.authMiddleware.checkAuth.bind(this.authMiddleware),
      this.answerController.searchAnswer.bind(this.answerController)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AnswerRoutes;
