const multer = require("multer");

const cloudinary = require("../config/cloudinary");

module.exports = multer({ storage: cloudinary });
