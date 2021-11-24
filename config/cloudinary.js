const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config(
  {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  }
)

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["png", "jpg", "svg", "tiff", "bmp", "jpeg", "gif", "pdf"],
    folder: "project2", // Folder name on the Cloudinary disk
  },
});

module.exports = multer({storage}) // Multer will be responsible for reading the forma and store on the cloud