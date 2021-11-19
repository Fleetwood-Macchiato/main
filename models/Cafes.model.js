const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cafeSchema = new Schema(
  {
    name: { type: String },
    address: { type: Schema.Types.ObjectId, ref: "Author" },
    priceLevel: { type: String },
  },

);

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model("Cafe", cafeSchema);
