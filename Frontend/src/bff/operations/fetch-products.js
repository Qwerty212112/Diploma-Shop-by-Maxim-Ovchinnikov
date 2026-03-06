import { getProducts } from '../api';

export const fetchProducts = async (searchPhrase, page, limit, gender = '') => {
	const [{ products, links, totalCount }] = await Promise.all([
		getProducts(searchPhrase, page, limit, gender),
	]);

	return {
		error: null,
		res: {
			products: (products || []).map((product) => ({
				...product,
			})),
			links,
			totalCount,
		},
	};
};
