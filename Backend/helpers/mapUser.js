module.exports = function (user) {
  const registeredAt = user.createdAt
    ? new Date(user.createdAt).toISOString().slice(0, 10)
    : "";

  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    registeredAt,
    favoriteProducts: user.favoriteProducts || [],
    cartProducts: user.cartProducts || [],
  };
};
