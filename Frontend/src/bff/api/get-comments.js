import { transformComment } from '../transformers';

const ALL_COMMENTS_URL = 'http://localhost:3005/comments';
const PRODUCT_COMMENTS_URL = 'http://localhost:3005/comments?product_id=';

export const getComments = (productId) => {
	const url =
		productId === undefined ? ALL_COMMENTS_URL : PRODUCT_COMMENTS_URL + productId;
	return fetch(url)
		.then((loadedComments) => loadedComments.json())
		.then((loadedComments) => loadedComments.map(transformComment));
};
