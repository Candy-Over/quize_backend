class AnswerController {
  constructor(answerService) {
    this.answerService = answerService;

    this.submitAnswer = this.submitAnswer.bind(this);
    this.searchAnswer = this.searchAnswer.bind(this);
  }

  async submitAnswer(req, res) {
    try {
      const answer = await this.answerService.submitAnswer({userId: req.user.id, ...req.body});
      res.status(201).json(answer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async searchAnswer(req, res) {
    try {
      const answers = await this.answerService.searchAnswer(req.query, req.user.id);
      res.status(200).json(answers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AnswerController;
