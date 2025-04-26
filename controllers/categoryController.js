class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;

    this.createCategory = this.createCategory.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getCategoryById = this.getCategoryById.bind(this);
  }

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await this.categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await this.categoryService.getCategoryById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;
