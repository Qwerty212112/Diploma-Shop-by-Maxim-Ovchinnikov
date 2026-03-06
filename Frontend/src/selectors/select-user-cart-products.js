export const selectUserCartProducts = ({ user }) =>
	(user.cartProducts || [])
		.map((item) =>
			typeof item === 'string'
				? { productId: item, size: '' }
				: {
						productId: item.productId ?? item.id ?? '',
						size: item.size ?? '',
					},
		)
		.filter((item) => item.productId);
