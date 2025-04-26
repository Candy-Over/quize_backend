class UserController {
  constructor(userService) {
    this.userService = userService;
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;
