const multer = require("multer");
const path = require("path");
const fs = require("fs");

class UploadService {
  constructor(folderName = "profile_pictures") {
    this.uploadDirectory = path.join(__dirname, `../uploads/${folderName}`);
    this.ensureUploadDirectory();
    this.allowedTypes = ["image/jpeg", "image/png"];

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDirectory);
      },
      filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}${extension}`;
        cb(null, filename);
      },
    });

    this.fileFilter = (req, file, cb) => {
      if (!this.allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed!"), false);
      }
      cb(null, true);
    };

    this.upload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    });
  }

  ensureUploadDirectory() {
    if (!fs.existsSync(this.uploadDirectory)) {
      fs.mkdirSync(this.uploadDirectory, { recursive: true });
    }
  }

  single(fieldName) {
    return this.upload.single(fieldName);
  }
}

module.exports = new UploadService();
