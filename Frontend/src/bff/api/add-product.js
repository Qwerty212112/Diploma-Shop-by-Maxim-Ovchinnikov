import { generateDate } from '../utils';

export const addProduct = ({ imageUrl, title, gender, content, sizes, price }) =>
	fetch(`http://localhost:3005/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			published_at: generateDate(),
			title,
			gender,
			content,
			sizes,
			price,
		}),
	}).then((createdProduct) => createdProduct.json());
