export const updateProduct = ({
	id,
	imageUrl,
	title,
	gender,
	content,
	sizes,
	price,
}) =>
	fetch(`http://localhost:3005/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			gender,
			content,
			sizes,
			price,
		}),
	}).then((loadProducts) => loadProducts.json());
