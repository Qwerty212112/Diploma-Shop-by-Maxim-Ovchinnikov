const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
    favoriteProducts: {
      type: [String],
      default: [],
    },
    cartProducts: {
      type: [
        {
          productId: { type: String, required: true, trim: true },
          size: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
