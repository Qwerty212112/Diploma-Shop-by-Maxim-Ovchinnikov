export const transformProduct = (dbProduct) => ({
	id: dbProduct.id,
	title: dbProduct.title,
	content: dbProduct.content,
	gender: dbProduct.gender,
	sizes: dbProduct.sizes,
	imageUrl: dbProduct.image_url,
	price: dbProduct.price,
	publishedAt: dbProduct.published_at,
});
