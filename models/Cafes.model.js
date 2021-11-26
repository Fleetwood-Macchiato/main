const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cafeSchema = new Schema({
  name: { type: String, unique: true, required: true },
  address: { type: String, unique: true, required: true },
  priceLevel: { type: String, required: true },
  imgUrl: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1478&q=80",
  }, 
  beans: [{ type: Schema.Types.ObjectId, ref: "Bean" }],
});
module.exports = model("Cafes", cafeSchema);
