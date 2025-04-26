const express = require("express");
const cors = require("cors");
const Database = require("./config/db");

class Server {
  constructor({ port, mongoUri }) {
    this.port = port || 8000;
    this.mongoUri = mongoUri;

    this.app = express();
    this.database = new Database(this.mongoUri);

    this.setupMiddleware();
    this.setupRoutes();
  }

  async start() {
    await this.database.connect();
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/uploads", express.static("uploads"));
  }

  setupRoutes() {
    const AuthRoutes = require("./routes/authRoutes");
    const UserRoutes = require("./routes/userRoutes");
    const CategoryRoutes = require("./routes/categoryRoutes");
    const QuestionRoutes = require("./routes/questionRoutes");
    const AnswerRoutes = require("./routes/answerRoutes");

    const authRoutes = new AuthRoutes();
    const categoryRoutes = new CategoryRoutes();
    const answerRoutes = new AnswerRoutes();
    const questionRoutes = new QuestionRoutes();
    const userRoutes = new UserRoutes();

    this.app.use("/api/auth", authRoutes.getRouter());
    this.app.use("/api/users", userRoutes.getRouter());
    this.app.use("/api/categories", categoryRoutes.getRouter());
    this.app.use("/api/questions", questionRoutes.getRouter());
    this.app.use("/api/answers", answerRoutes.getRouter());
  }
}

module.exports = Server;
