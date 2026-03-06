import { updateUserAddProducts } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const addCartProduct = async (
	hash,
	userId,
	productId,
	cartProducts = [],
	selectedSize,
) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const normalizedCartProducts = cartProducts
		.map((item) =>
			typeof item === 'string'
				? { productId: item, size: '' }
				: {
						productId: item.productId ?? item.id ?? '',
						size: item.size ?? '',
					},
		)
		.filter((item) => item.productId);
	const cartItem = {
		productId,
		size: selectedSize ?? '',
	};
	const hasCartItem = normalizedCartProducts.some(
		(item) => item.productId === cartItem.productId && item.size === cartItem.size,
	);
	const nextAddProducts = hasCartItem
		? normalizedCartProducts.filter(
				(item) =>
					!(item.productId === cartItem.productId && item.size === cartItem.size),
			)
		: [...normalizedCartProducts, cartItem];

	await updateUserAddProducts(userId, nextAddProducts);

	return {
		error: null,
		res: {
			cartProducts: nextAddProducts,
			isAdd: nextAddProducts.some(
				(item) => item.productId === cartItem.productId && item.size === cartItem.size,
			),
		},
	};
};
