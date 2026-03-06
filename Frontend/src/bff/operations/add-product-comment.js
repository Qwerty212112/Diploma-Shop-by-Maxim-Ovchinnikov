import { addComment, getProduct } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getProductCommentsWithAuthor } from '../utils';

export const addProductComment = async (hash, userId, productId, content, rating = 5) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.BUYER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const normalizedRating = Math.min(5, Math.max(1, Number(rating) || 1));

	await addComment(userId, productId, content, normalizedRating);

	const product = await getProduct(productId);
	const commentsWithAuthor = await getProductCommentsWithAuthor(productId);

	return {
		error: null,
		res: {
			...product,
			comments: commentsWithAuthor,
		},
	};
};
