import { getProduct } from '../api';
import { getProductCommentsWithAuthor } from '../utils';

export const fetchProduct = async (productId) => {
	let product;
	let error;
	try {
		product = await getProduct(productId);
	} catch (productError) {
		error = productError;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	const commentsWithAuthor = await getProductCommentsWithAuthor(productId);

	return {
		error: null,
		res: {
			...product,
			comments: commentsWithAuthor,
		},
	};
};
