const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cafeSchema = new Schema({
  name: { type: String },
  address: String,
  priceLevel: { type: String },
  image: String,
});

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model("Cafes", cafeSchema);
