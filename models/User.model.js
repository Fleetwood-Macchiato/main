const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Cafes", default: [] }],
  image: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
  }
});
const User = model("User", userSchema);
module.exports = User;
