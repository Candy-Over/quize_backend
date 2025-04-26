const Category = require("../models/Category");

class CategoryService {
  async createCategory(name) {
    if (!name) {
      throw new Error("Name required");
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      throw new Error("Category already exists");
    }

    const category = new Category({ name });
    return await category.save();
  }

  async getAllCategories() {
    return await Category.aggregate([
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "categories",
          as: "questions",
        },
      },
      {
        $project: {
          name: 1,
          questionCount: { $size: "$questions" },
        },
      },
    ]);
  }

  async getCategoryById(categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }
}

module.exports = CategoryService;
