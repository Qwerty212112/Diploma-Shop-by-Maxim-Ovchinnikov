import { request } from '../utils/request';
import { setUser } from './set-user';

export const removeInCartProductAsync =
(productId, selectedSize = '') => (dispatch, getState) => {
		const { user } = getState();
		const normalizedCartProducts = (user.cartProducts || [])
			.map((item) =>
				typeof item === 'string'
					? { productId: item, size: '' }
					: {
							productId: item.productId ?? item.id ?? '',
							size: item.size ?? '',
						},
			)
			.filter((item) => item.productId);

		const nextCartProducts = normalizedCartProducts.filter(
			(item) =>
				!(item.productId === productId && (item.size ?? '') === (selectedSize ?? '')),
		);

		dispatch(setUser({ cartProducts: nextCartProducts }));

		const userData = sessionStorage.getItem('userData');

		if (userData) {
			const parsedUserData = JSON.parse(userData);
			sessionStorage.setItem(
				'userData',
				JSON.stringify({
					...parsedUserData,
					cartProducts: nextCartProducts,
				}),
			);
		}

		request(`/users/${user.id}/cart`, 'DELETE', {
			productId,
			size: selectedSize ?? '',
		}).then((response) => {
			const serverCartProducts = response.data?.cartProducts;
			if (!serverCartProducts) {
				return;
			}

			dispatch(setUser({ cartProducts: serverCartProducts }));

			const latestUserData = sessionStorage.getItem('userData');
			if (!latestUserData) {
				return;
			}

			const parsedLatestUserData = JSON.parse(latestUserData);
			sessionStorage.setItem(
				'userData',
				JSON.stringify({
					...parsedLatestUserData,
					cartProducts: serverCartProducts,
				}),
			);
		});
	};
