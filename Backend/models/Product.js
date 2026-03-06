const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image_url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validator.isURL,
        message: "image_url should be a valid url",
      },
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      articul: { type: String, required: true, trim: true },
      composition: { type: String, required: true, trim: true },
      style: { type: String, required: true, trim: true },
      zipper: { type: String, required: true, trim: true },
      pattern: { type: String, required: true, trim: true },
      cut: { type: String, required: true, trim: true },
      boarding: { type: String, required: true, trim: true },
    },
    sizes: {
      type: [String],
      required: true,
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    published_at: {
      type: Date,
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
