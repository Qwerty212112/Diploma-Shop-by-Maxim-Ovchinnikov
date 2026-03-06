import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { H2, Icon } from '../../components';
import { selectUserFavoriteProducts, selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { CLOSE_MODAL, openModal, removeInFavoriteProductAsync } from '../../actions';
import { request } from '../../utils/request';

const FavoritesContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const favoriteProducts = useSelector(selectUserFavoriteProducts);
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (favoriteProducts.length === 0) {
			setProducts([]);
			return;
		}

		setIsLoading(true);

		Promise.all(
			favoriteProducts.map((productId) => request(`/products/${productId}`)),
		)
			.then((response) =>
				response.filter(({ error, data }) => !error && data).map(({ data }) => data),
			)
			.then(setProducts)
			.finally(() => setIsLoading(false));
	}, [favoriteProducts]);

	if (roleId === ROLE.GUEST) {
		return (
			<div className={className}>
				<H2>Войдите в аккаунт, чтобы пользоваться избранным</H2>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className={className}>
				<H2>Загрузка избранных товаров...</H2>
			</div>
		);
	}

	const onFavoriteRemove = (event, id) => {
		event.preventDefault();
		event.stopPropagation();

		dispatch(
			openModal({
				text: 'Удалить товар из избранного?',
				onConfirm: () => {
					setProducts((prevProducts) =>
						prevProducts.filter((product) => product.id !== id),
					);

					dispatch(removeInFavoriteProductAsync(id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<H2>Избранные товары</H2>
			{products.length === 0 ? (
				<p className="empty-state">Пока нет товаров в избранном.</p>
			) : (
				<div className="grid">
					{products.map(({ id, title, imageUrl }) => (
						<Link key={id} className="card" to={`/product/${id}`}>
							<img src={imageUrl} alt={title} />
							<div className="title">{title}</div>
							<Icon
								id="fa-trash-o"
								size="21px"
								margin="0 12px 12px auto"
								onClick={(event) => onFavoriteRemove(event, id)}
							/>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export const Favorites = styled(FavoritesContainer)`
	margin: 40px 0;
	padding: 40px 80px;
	min-height: 600px;

	& .empty-state {
		font-size: 22px;
		color: #e0b682;
		text-shadow: 0 1px 0 #000;
	}

	& .grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 20px;
		margin-top: 30px;
	}

	& .card {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		border-radius: 12px;
		overflow: hidden;
		background-color: #fdf3e7;
		border: 1px solid #ecd7be;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	& .card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
	}

	& .card img {
		width: 100%;
		height: 320px;
		object-fit: cover;
	}

	& .title {
		padding: 12px;
		font-size: 20px;
		color: #403f3f;
	}
`;
