const express = require("express");
const UserService = require("../services/userService");
const UserController = require("../controllers/userController");

class UserRoutes {
  constructor() {
    this.router = express.Router();

    this.userService = new UserService();
    this.userController = new UserController(this.userService);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.userController.getAllUsers);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = UserRoutes;
