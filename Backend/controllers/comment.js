const Comment = require("../models/Comment");
const Product = require("../models/Product");

async function addComment(productId, comment) {
  const product = await Product.findOne({ id: productId });
  if (!product) {
    return null;
  }

  const newComment = await Comment.create({
    ...comment,
    product: product._id,
  });

  await Product.findByIdAndUpdate(product._id, {
    $push: { comments: newComment._id },
  });

  await newComment.populate("author");

  return newComment;
}

async function deleteComment(productId, commentId) {
  const product = await Product.findOne({ id: productId });
  await Comment.deleteOne({ _id: commentId });
  if (!product) {
    return;
  }

  await Product.findByIdAndUpdate(product._id, {
    $pull: { comments: commentId },
  });
}

module.exports = {
  addComment,
  deleteComment,
};
