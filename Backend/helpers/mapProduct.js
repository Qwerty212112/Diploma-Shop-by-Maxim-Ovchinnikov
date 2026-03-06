const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function mapProduct(product) {
  return {
    id: product.id,
    title: product.title,
    imageUrl: product.image_url,
    gender: product.gender,
    content: product.content,
    sizes: product.sizes,
    price: product.price,
    publishedAt: product.published_at,
    comments:
      product.comments.map((comment) =>
        mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment),
      ) || [],
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
