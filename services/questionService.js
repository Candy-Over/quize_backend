const Question = require("../models/Question");
const Category = require("../models/Category");
const csv = require("csv-parser");
const fs = require("fs");

class QuestionService {
  constructor() {}

  async addQuestion(questionData) {
    const question = new Question(questionData);
    await question.save();
    return question;
  }

  async getQuestionsByCategory(categoryId) {
    return await Question.find({ categories: categoryId });
  }

  async bulkImportQuestions(file) {
    const questions = [];
    const categories = await Category.find();

    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          try {
            for (let data of results) {
              const categoryNames = data.categories
                ? data.categories.split(",").map((c) => c.trim())
                : [];
              const categoriesForQuestion = categories
                .filter((category) => categoryNames.includes(category.name))
                .map((category) => category._id);

              const question = new Question({
                questionText: data.question,
                options: [
                  data.optionA,
                  data.optionB,
                  data.optionC,
                  data.optionD,
                ].map((opt) => opt?.trim()),
                correctAnswer: data.correctAnswer?.trim(),
                categories: categoriesForQuestion,
              });

              questions.push(await question.save());
            }
            resolve(questions);
          } catch (error) {
            reject(error);
          }
        })
        .on("error", reject);
    });
  }
}

module.exports = QuestionService;
