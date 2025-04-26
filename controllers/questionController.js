class QuestionController {
  constructor(questionService) {
    this.questionService = questionService;

    this.addQuestion = this.addQuestion.bind(this);
    this.getQuestionsByCategory = this.getQuestionsByCategory.bind(this);
    this.bulkImportQuestions = this.bulkImportQuestions.bind(this);
  }

  async addQuestion(req, res) {
    try {
      const question = await this.questionService.addQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getQuestionsByCategory(req, res) {
    try {
      const questions = await this.questionService.getQuestionsByCategory(req.params.categoryId);
      res.status(200).json(questions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async bulkImportQuestions(req, res) {
    try {
      const questions = await this.questionService.bulkImportQuestions(req.file);
      res.status(201).json(questions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = QuestionController;
