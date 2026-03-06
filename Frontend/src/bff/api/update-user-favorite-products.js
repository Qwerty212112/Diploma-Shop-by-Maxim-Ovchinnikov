export const updateUserFavoriteProducts = (userId, favoriteProducts) =>
	fetch(`http://localhost:3005/users/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			favorite_products: favoriteProducts,
		}),
	});
