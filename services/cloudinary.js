const cloudinary = require("cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudStore = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ovellesnegres",
    allowed_formats: ["png", "jpg", "svg", "tiff", "bmp", "jpeg", "gif", "pdf"],
  },
});

module.exports = cloudStore;
