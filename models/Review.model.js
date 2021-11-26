const { Schema, model } = require("mongoose");
const reviewSchema = new Schema({
  user: { type: String },
  comment: { type: String, maxlength: 280 },
  cafeReviewed: { type: Schema.Types.ObjectId, ref: "Cafe" },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
