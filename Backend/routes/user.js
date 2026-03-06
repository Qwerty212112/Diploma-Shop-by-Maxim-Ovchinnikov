const express = require("express");
const {
  getUsers,
  getRoles,
  updateUser,
  deleteUser,
  toggleFavoriteProduct,
  addCartProduct,
  removeCartProduct,
} = require("../controllers/user");
const mapUser = require("../helpers/mapUser");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router();

router.use(authenticated);
const canManageUserData = (req, userId) =>
  req.user.id === userId || req.user.role === ROLES.ADMIN;

router.get("/users", hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUsers();

  res.send({ data: users.map(mapUser) });
});

router.get("/users/roles", hasRole([ROLES.ADMIN]), async (req, res) => {
  const roles = getRoles();

  res.send({ data: roles });
});

router.patch("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    role: req.body.roleId,
  });

  res.send({ data: mapUser(newUser) });
});

router.delete("/users/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deleteUser(req.params.id);

  res.send({ error: null });
});

router.patch("/users/:id/favorites", async (req, res) => {
  if (!canManageUserData(req, req.params.id)) {
    return res.status(403).send({ error: "Access denied" });
  }

  const user = await toggleFavoriteProduct(req.params.id, req.body.productId);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  res.send({ data: mapUser(user) });
});

router.patch("/users/:id/cart", async (req, res) => {
  if (!canManageUserData(req, req.params.id)) {
    return res.status(403).send({ error: "Access denied" });
  }

  const user = await addCartProduct(
    req.params.id,
    req.body.productId,
    req.body.size,
  );
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  res.send({ data: mapUser(user) });
});

router.delete("/users/:id/cart", async (req, res) => {
  if (!canManageUserData(req, req.params.id)) {
    return res.status(403).send({ error: "Access denied" });
  }

  const user = await removeCartProduct(
    req.params.id,
    req.body.productId,
    req.body.size,
  );
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }

  res.send({ data: mapUser(user) });
});

module.exports = router;
