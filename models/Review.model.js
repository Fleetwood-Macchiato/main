const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const reviewSchema = new Schema({
  user: { type: String },
  comment: {type: String},
  cafeReviewed: { type: Schema.Types.ObjectId, ref: "Cafe" },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
