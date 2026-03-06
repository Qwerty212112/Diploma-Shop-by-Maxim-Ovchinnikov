const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("User not found");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
}

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

async function toggleFavoriteProduct(userId, productId) {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  const favoriteProducts = user.favoriteProducts || [];
  user.favoriteProducts = favoriteProducts.includes(productId)
    ? favoriteProducts.filter((id) => id !== productId)
    : [...favoriteProducts, productId];

  await user.save();
  return user;
}

async function addCartProduct(userId, productId, size = "") {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  const normalizedSize = size || "";
  const cartProducts = user.cartProducts || [];
  const isAlreadyInCart = cartProducts.some(
    (item) =>
      item?.productId === productId && (item?.size || "") === normalizedSize,
  );

  if (!isAlreadyInCart) {
    user.cartProducts = [
      ...cartProducts,
      {
        productId,
        size: normalizedSize,
      },
    ];
    await user.save();
  }

  return user;
}

async function removeCartProduct(userId, productId, size = "") {
  const user = await User.findById(userId);
  if (!user) {
    return null;
  }

  const normalizedSize = size || "";
  user.cartProducts = (user.cartProducts || []).filter(
    (item) =>
      !(
        item?.productId === productId && (item?.size || "") === normalizedSize
      ),
  );
  await user.save();
  return user;
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
  toggleFavoriteProduct,
  addCartProduct,
  removeCartProduct,
};
