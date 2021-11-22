const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cafeSchema = new Schema({
  name: {type: String, unique: true, required: true}, 
  address: {type: String, unique: true, required: true},
  priceLevel: {type: String, required: true},
  image: {type: String, default: "https://media.istockphoto.com/photos/coffee-shop-picture-id1279333349"},//supplies default img if nothing provided, use cloudinary to upload imgs from user
  beans: [{type: Schema.Types.ObjectId, ref: 'Bean'}],
  //review:[{
  //         user: String,
  //       comments: String]}
});


module.exports = model("Cafes", cafeSchema);
