import { deleteComment, getProduct } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getProductCommentsWithAuthor } from '../utils';

export const removeProductComment = async (hash, productId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(id);

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
