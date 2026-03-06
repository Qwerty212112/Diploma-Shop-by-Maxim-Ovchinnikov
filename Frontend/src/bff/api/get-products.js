import { transformProduct } from '../transformers';

export const getProducts = (
	searchPhrase = '',
	page = 1,
	limit = 10,
	gender = '',
) => {
	const searchParams = new URLSearchParams({
		title_like: searchPhrase,
		_page: String(page),
		_limit: String(limit),
	});

	if (gender) {
		searchParams.set('gender', gender);
	}

	return fetch(`http://localhost:3005/products?${searchParams.toString()}`)
		.then((loadedProducts) =>
			Promise.all([
				loadedProducts.json(),
				loadedProducts.headers.get('Link'),
				loadedProducts.headers.get('X-Total-Count'),
			]),
		)
		.then(([loadedProducts, links, totalCount]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links,
			totalCount: Number(totalCount) || 0,
		}));
};
