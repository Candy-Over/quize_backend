const express = require("express");
const multer = require("multer");
const QuestionService = require("../services/questionService");
const QuestionController = require("../controllers/questionController");

class QuestionRoutes {
  constructor() {
    this.router = express.Router();
    this.upload = multer({ dest: "uploads/" });

    this.questionService = new QuestionService();
    this.questionController = new QuestionController(this.questionService);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", this.questionController.addQuestion);
    this.router.get(
      "/:categoryId",
      this.questionController.getQuestionsByCategory
    );
    this.router.post(
      "/bulk",
      this.upload.single("file"),
      this.questionController.bulkImportQuestions
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = QuestionRoutes;
