class AuthController {
  constructor(authService, uploadService) {
    this.authService = authService;
    this.uploadService = uploadService;

    this.register = this.register.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  async register(req, res) {
    try {
      const user = await this.authService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { userId } = req.params;
      const user = await this.authService.verifyEmail(userId);
      res.json({ message: 'Verification successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { token } = await this.authService.loginUser(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await this.authService.getProfile(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async editProfile(req, res) {
    try {
      this.uploadService.single('profilePicture')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        const updatedData = req.body;
        if (req.file) {
          updatedData.profilePicture = req.file.filename;
        }

        const updatedUser = await this.authService.editProfile(req.user.id, updatedData);
        return res.status(200).json(updatedUser);
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
