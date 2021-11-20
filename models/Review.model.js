const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: String,
  cafeReviewed: { type: Schema.Types.ObjectId, ref: "Cafe" },
  image: { type: String, required: false },
});

const Review = model("Review", reviewSchema);

module.exports = User;
