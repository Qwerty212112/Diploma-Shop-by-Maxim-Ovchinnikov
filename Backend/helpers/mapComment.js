module.exports = function mapComment(comment) {
  const authorLogin = comment.author?.login || "";
  const productId = comment.product?.id || comment.product_id || comment.product;

  return {
    id: comment.id || comment._id,
    productId,
    author: authorLogin,
    publishedAt: comment.published_at || comment.createdAt,
    content: comment.content,
    rating: comment.rating,
    author_id: comment.author_id || comment.author?.id || comment.author,
    product_id: productId,
    published_at: comment.published_at || comment.createdAt,
  };
};
