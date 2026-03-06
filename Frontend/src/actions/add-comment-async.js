import { request } from '../utils/request';
import { addComment } from './add-comment';

export const addCommentAsync = (productId, content, rating) => (dispatch) => {
	request(`/products/${productId}/comments`, 'POST', { content, rating }).then(
		(comment) => {
			dispatch(addComment(comment.data));
		},
	);
};
