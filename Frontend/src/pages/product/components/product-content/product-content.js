import styled from 'styled-components';
import { TitleProduct, Icon, ButtonBuy } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';
import { AboutProduct } from '../about-product/about-product';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserCartProducts,
	selectUserFavoriteProducts,
	selectUserId,
	selectUserRole,
} from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { setUser } from '../../../../actions';
import { request } from '../../../../utils/request';

const ProductContentContainer = ({
	className,
	product: { id, title, imageUrl, gender, content, price, publishedAt, sizes = [] },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const roleId = useSelector(selectUserRole);
	const favoriteProducts = useSelector(selectUserFavoriteProducts);
	const cartProducts = useSelector(selectUserCartProducts);
	const [selectedSize, setSelectedSize] = useState(sizes[0] ?? '');
	const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
	const [isUpdatingButtonBuy, setIsUpdatingButtonBuy] = useState(false);
	const isAuthorizedUser = roleId !== ROLE.GUEST;
	const isFavorite = favoriteProducts.includes(id);
	const isInCart = cartProducts.some(
		(item) => item.productId === id && (item.size ?? '') === (selectedSize ?? ''),
	);

	useEffect(() => {
		setSelectedSize(sizes[0] ?? '');
	}, [sizes]);

	const onToggleFavorite = () => {
		if (!isAuthorizedUser || isUpdatingFavorite) {
			return;
		}

		setIsUpdatingFavorite(true);

		request(`/users/${userId}/favorites`, 'PATCH', { productId: id })
			.then((response) => {
				if (response.error || !response.data) {
					return;
				}

				dispatch(
					setUser({ favoriteProducts: response.data.favoriteProducts || [] }),
				);
				const userData = sessionStorage.getItem('userData');

				if (userData) {
					const parsedUserData = JSON.parse(userData);
					sessionStorage.setItem(
						'userData',
						JSON.stringify({
							...parsedUserData,
							favoriteProducts: response.data.favoriteProducts || [],
						}),
					);
				}
			})
			.finally(() => setIsUpdatingFavorite(false));
	};

	const addProductToCard = () => {
		if (!isAuthorizedUser || isUpdatingButtonBuy) {
			return;
		}

		setIsUpdatingButtonBuy(true);

		request(`/users/${userId}/cart`, 'PATCH', {
			productId: id,
			size: selectedSize ?? '',
		})
			.then((response) => {
				if (response.error || !response.data) {
					return;
				}

				dispatch(setUser({ cartProducts: response.data.cartProducts || [] }));
				const userData = sessionStorage.getItem('userData');

				if (userData) {
					const parsedUserData = JSON.parse(userData);
					sessionStorage.setItem(
						'userData',
						JSON.stringify({
							...parsedUserData,
							cartProducts: response.data.cartProducts || [],
						}),
					);
				}
			})
			.finally(() => setIsUpdatingButtonBuy(false));
	};

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<TitleProduct>{title}</TitleProduct>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => navigate(`/product/${id}/edit`)}
					/>
				}
			/>
			<AboutProduct className="product-text" content={content} gender={gender} />
			{sizes.length > 0 && (
				<div className="size-panel">
					<div className="size-title">Выберите размер товара</div>
					<div className="size-options">
						{sizes.map((size) => (
							<button
								type="button"
								key={size}
								className={`size-option ${
									selectedSize === size ? 'is-selected' : ''
								}`}
								onClick={() => setSelectedSize(size)}
							>
								{size}
							</button>
						))}
					</div>
				</div>
			)}
			<div className="price">{price}₽</div>
			<div className="sales-panel">
				<ButtonBuy
					type="button"
					className={`button-buy ${isInCart ? 'is-in-cart' : ''}`}
					onClick={addProductToCard}
					disabled={!isAuthorizedUser || isUpdatingButtonBuy}
					title={isAuthorizedUser ? '' : 'Войдите в аккаунт, чтобы добавить в корзину'}
				>
					{isInCart ? 'Товар в корзине' : 'Добавить в корзину'}
				</ButtonBuy>

				<button
					type="button"
					className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
					onClick={onToggleFavorite}
					disabled={!isAuthorizedUser || isUpdatingFavorite}
					aria-label={
						isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
					}
					title={
						isAuthorizedUser ? '' : 'Войдите в аккаунт, чтобы добавить в избранное'
					}
				>
					<Icon
						className="fa-heart-icon"
						id={isFavorite ? 'fa-heart' : 'fa-heart-o'}
						size="28px"
						margin="0"
					/>
				</button>
			</div>
		</div>
	);
};

export const ProductContent = styled(ProductContentContainer)`
	& img {
		height: 30%;
		width: 30%;
		float: left;
		margin: 0 20px 10px 0;
	}

	& .button-buy {
		&:active {
			background-color: #91816f;
			color: #fffafa;
		}

		&:hover {
			background-color: #d59a58;
		}
	}

	& .button-buy.is-in-cart {
		background: linear-gradient(135deg, #6eb572 0%, #4d9f62 100%);
	}

	& .sales-panel {
		display: flex;
	}

	& .favorite-button {
		width: 42px;
		height: 42px;
		margin: 10px;
		border-radius: 50%;
		border: 1px solid #e0b682;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition:
			background-color 0.2s ease,
			opacity 0.2s ease;
	}

	& .favorite-button > div {
		color: #e0b682;
	}

	& .favorite-button.is-favorite {
		background-color: #e0b682;
	}

	& .favorite-button.is-favorite > div {
		color: #fff;
	}

	& .favorite-button:disabled {
		opacity: 0.65;
		cursor: default;
	}

	& .favorite-button:not(:disabled):hover {
		cursor: pointer;
	}

	& .size-panel {
		margin: 12px 0 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: #e0b682;
		text-shadow: 0 1px 0 #000;
	}

	& .size-title {
		font-size: 18px;
	}

	& .size-options {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	& .size-option {
		border: 1px solid #e0b682;
		background: transparent;
		color: #e0b682;
		padding: 6px 12px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 16px;
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}

	& .size-option.is-selected {
		background: #e0b682;
		color: #1c1c1c;
		border-color: #e0b682;
	}

	& .fa-heart-icon {
		cursor: pointer;
	}

	& .price {
		font-size: 35px;
		display: flex;
		color: #e0b682;
	}
`;
