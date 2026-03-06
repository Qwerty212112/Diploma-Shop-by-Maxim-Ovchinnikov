import { request } from '../utils/request';
import { setUser } from './set-user';

export const removeInFavoriteProductAsync = (productId) => (dispatch, getState) => {
		const { user } = getState();
		const favoriteProducts = user.favoriteProducts || [];
		const nextFavoriteProducts = favoriteProducts.filter((id) => id !== productId);

		request(`/users/${user.id}/favorites`, 'PATCH', { productId }).then((response) => {
			if (response.error || !response.data) {
				return;
			}

			dispatch(
				setUser({
					favoriteProducts: response.data.favoriteProducts || nextFavoriteProducts,
				}),
			);

			const userData = sessionStorage.getItem('userData');

			if (userData) {
				const parsedUserData = JSON.parse(userData);
				sessionStorage.setItem(
					'userData',
					JSON.stringify({
						...parsedUserData,
						favoriteProducts:
							response.data.favoriteProducts || nextFavoriteProducts,
					}),
				);
			}
		});
	};
