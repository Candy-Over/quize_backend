const express = require("express");
const CategoryService = require("../services/categoryService");
const CategoryController = require("../controllers/categoryController");

class CategoryRoutes {
  constructor() {
    this.router = express.Router();

    this.categoryService = new CategoryService();
    this.categoryController = new CategoryController(this.categoryService);

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", this.categoryController.createCategory);
    this.router.get("/", this.categoryController.getAllCategories);
    this.router.get("/:id", this.categoryController.getCategoryById);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = CategoryRoutes;
