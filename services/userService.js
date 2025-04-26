const User = require("../models/User");

class UserService {
  constructor() {}

  async getAllUsers() {
    return await User.find();
  }
}

module.exports = UserService;
