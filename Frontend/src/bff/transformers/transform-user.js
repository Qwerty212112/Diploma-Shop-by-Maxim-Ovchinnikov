export const transformUser = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	password: dbUser.password,
	registeredAt: dbUser.registed_at,
	roleId: dbUser.role_id,
	favoriteProducts: dbUser.favorite_products || [],
	cartProducts: dbUser.cart_products || [],
});
