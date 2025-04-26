const mongoose = require("mongoose");
const moment = require("moment-timezone");

class AnswerService {
  constructor({ AnswerModel, QuestionModel }) {
    this.Answer = AnswerModel;
    this.Question = QuestionModel;
  }

  async submitAnswer(answerData) {
    const { userId, questionId, answer } = answerData;

    const question = await this.Question.findById(questionId);
    if (!question) throw new Error("Question not found.");

    const answerSubmission = new this.Answer({
      userId,
      questionId,
      answer,
      submittedAt: moment().toDate(),
    });

    await answerSubmission.save();
    return answerSubmission;
  }

  async searchAnswer(query, userId) {
    const { questionText, timezone } = query;

    const match = {};
    if (userId) {
      try {
        match["userId"] = new mongoose.Types.ObjectId(userId);
      } catch (e) {
        throw new Error("Invalid userId format.");
      }
    }

    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: "questions",
          localField: "questionId",
          foreignField: "_id",
          as: "questionDetails",
        },
      },
      { $unwind: "$questionDetails" },
    ];

    if (questionText) {
      pipeline.push({
        $match: {
          "questionDetails.questionText": {
            $regex: questionText,
            $options: "i",
          },
        },
      });
    }

    pipeline.push({
      $project: {
        answer: 1,
        submittedAt: 1,
        questionText: "$questionDetails.questionText",
      },
    });

    const answers = await this.Answer.aggregate(pipeline);

    if (timezone) {
      answers.forEach((answer) => {
        answer.submittedAt = moment(answer.submittedAt)
          .tz(timezone)
          .format("YYYY-MM-DD HH:mm:ss");
      });
    }

    return answers;
  }
}

module.exports = AnswerService;
