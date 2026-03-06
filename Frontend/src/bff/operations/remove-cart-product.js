import { deleteProductInCart } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeCartProduct = async (hash, userId, cartProducts = []) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteProductInCart(userId, cartProducts);

	return {
		error: null,
		res: {
			cartProducts,
		},
	};
};
