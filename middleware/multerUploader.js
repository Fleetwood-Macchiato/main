const multer = require("multer");

const cloudinary = require("../services/cloudinary");

module.exports = multer({ storage: cloudinary });
