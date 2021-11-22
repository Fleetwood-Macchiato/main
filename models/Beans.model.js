const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const beanSchema = new Schema({
  name: String,
  origin: String,
  flavorProfile: String,
  cafes: { type: Schema.Types.ObjectId, ref: "Cafes" },
  image: String,
});

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model("Bean", beanSchema);
