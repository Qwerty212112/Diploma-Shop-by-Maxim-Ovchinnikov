const express = require("express");
const {
  getPeoducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");
const { addComment, deleteComment } = require("../controllers/comment");
const mapProduct = require("../helpers/mapProduct");
const mapComment = require("../helpers/mapComment");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router();

router.get("/products", async (req, res) => {
  const { products, lastPage } = await getPeoducts(
    req.query.search,
    req.query.limit,
    req.query.page,
    req.query.gender,
  );

  res.send({ data: { lastPage, products: products.map(mapProduct) } });
});

router.get("/products/:id", async (req, res) => {
  const product = await getProduct(req.params.id);

  if (!product) {
    return res.status(404).send({ error: "Товар не найден" });
  }

  res.send({ data: mapProduct(product) });
});

router.use(authenticated);

router.post("/products/:id/comments", async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    rating: req.body.rating,
    author: req.user.id,
  });

  if (!newComment) {
    return res.status(404).send({ error: "Product not found" });
  }

  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/products/:productId/comments/:commentId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.productId, req.params.commentId);
    res.send({ error: null });
  },
);

router.post("/products", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    id: req.body.id,
    title: req.body.title,
    image_url: req.body.image_url || req.body.imageUrl,
    gender: req.body.gender,
    content: {
      articul: req.body.content?.articul,
      composition: req.body.content?.composition,
      style: req.body.content?.style,
      zipper: req.body.content?.zipper,
      pattern: req.body.content?.pattern,
      cut: req.body.content?.cut,
      boarding: req.body.content?.boarding,
    },
    sizes: req.body.sizes,
    price: req.body.price,
    published_at: req.body.published_at || req.body.publishedAt,
  });

  res.send({ data: mapProduct(newProduct) });
});

router.patch("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updateProduct = await editProduct(req.params.id, {
    id: req.body.id,
    title: req.body.title,
    image_url: req.body.image_url || req.body.imageUrl,
    gender: req.body.gender,
    content: {
      articul: req.body.content?.articul,
      composition: req.body.content?.composition,
      style: req.body.content?.style,
      zipper: req.body.content?.zipper,
      pattern: req.body.content?.pattern,
      cut: req.body.content?.cut,
      boarding: req.body.content?.boarding,
    },
    sizes: req.body.sizes,
    price: req.body.price,
    published_at: req.body.published_at || req.body.publishedAt,
  });

  if (!updateProduct) {
    return res.status(404).send({ error: "Товар не найден" });
  }

  res.send({ data: mapProduct(updateProduct) });
});

router.delete("/products/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteProduct(req.params.id);
  res.send({ error: null });
});

module.exports = router;
