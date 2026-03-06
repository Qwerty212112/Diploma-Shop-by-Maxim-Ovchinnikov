import { request } from '../utils/request';
import { setProductData } from './set-product-data';
import { generateDate } from '../bff/utils/generate-date';

export const saveProductAsync = (productDataOrLegacyArg, maybeProductData) =>
	(dispatch) => {
		const newProductData =
			typeof productDataOrLegacyArg === 'function'
				? maybeProductData
				: productDataOrLegacyArg;

		if (!newProductData || typeof newProductData !== 'object') {
			return Promise.resolve(null);
		}

		const isEditMode = Boolean(newProductData.id);
		const productId = isEditMode ? newProductData.id : `P-${Date.now()}`;
		const payload = {
			...newProductData,
			id: productId,
			publishedAt: newProductData.publishedAt || generateDate(),
		};

		const url = isEditMode ? `/products/${productId}` : '/products';
		const method = isEditMode ? 'PATCH' : 'POST';

		return request(url, method, payload).then((updatedProduct) => {
			dispatch(setProductData(updatedProduct.data));
			return updatedProduct.data;
		});
	};
