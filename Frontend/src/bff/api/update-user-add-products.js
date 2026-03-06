export const updateUserAddProducts = (userId, cartProducts) =>
	fetch(`http://localhost:3005/users/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			cart_products: cartProducts,
		}),
	});
