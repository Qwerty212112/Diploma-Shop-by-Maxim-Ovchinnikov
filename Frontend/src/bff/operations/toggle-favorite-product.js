import { updateUserFavoriteProducts } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const toggleFavoriteProduct = async (
	hash,
	userId,
	productId,
	favoriteProducts = [],
) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.BUYER];
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const nextFavoriteProducts = favoriteProducts.includes(productId)
		? favoriteProducts.filter((id) => id !== productId)
		: [...favoriteProducts, productId];

	await updateUserFavoriteProducts(userId, nextFavoriteProducts);

	return {
		error: null,
		res: {
			favoriteProducts: nextFavoriteProducts,
			isFavorite: nextFavoriteProducts.includes(productId),
		},
	};
};
