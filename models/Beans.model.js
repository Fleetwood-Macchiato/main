const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const beanSchema = new Schema({
  name: String,
  origin: String,
  flavorProfile: String,
  image: String,
  cafe: [{ type: Schema.Types.ObjectId, ref: "Cafe" }],
});

module.exports = model("Bean", beanSchema);
