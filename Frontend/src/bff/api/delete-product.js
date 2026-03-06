export const deleteProduct = (productId) =>
	fetch(`http://localhost:3005/product/${productId}`, {
		method: 'DELETE',
	});
