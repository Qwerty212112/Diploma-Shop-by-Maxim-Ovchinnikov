import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonBuy, H2, Icon } from '../../components';
import { selectUserCartProducts, selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { CLOSE_MODAL, openModal, removeInCartProductAsync } from '../../actions';
import { request } from '../../utils/request';

const CartContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const cartProducts = useSelector(selectUserCartProducts);
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const totalPrice = useMemo(
		() => products.reduce((sum, product) => sum + Number(product.price || 0), 0),
		[products],
	);

	useEffect(() => {
		if (cartProducts.length === 0) {
			setProducts([]);
			return;
		}

		setIsLoading(true);

		Promise.all(
			cartProducts.map(({ productId, size }) =>
				request(`/products/${productId}`).then((response) => ({
					error: response.error,
					res: response.data,
					size,
				})),
			),
		)
			.then((response) =>
				response
					.filter(({ error, res }) => !error && res)
					.map(({ res, size }) => ({ ...res, selectedSize: size ?? '' })),
			)
			.then(setProducts)
			.finally(() => setIsLoading(false));
	}, [cartProducts]);

	if (roleId === ROLE.GUEST) {
		return (
			<div className={className}>
				<H2>Войдите в аккаунт, чтобы пользоваться корзиной</H2>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className={className}>
				<H2>Загрузка корзины товаров...</H2>
			</div>
		);
	}

	const onProductRemove = (event, id, selectedSize) => {
		event.preventDefault();
		event.stopPropagation();

		dispatch(
			openModal({
				text: 'Удалить товар из корзины?',
				onConfirm: () => {
					setProducts((prevProducts) =>
						prevProducts.filter(
							(product) =>
								!(
									product.id === id &&
									(product.selectedSize ?? '') === (selectedSize ?? '')
								),
						),
					);

					dispatch(removeInCartProductAsync(id, selectedSize));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<H2>Корзина с товарами</H2>
			{products.length === 0 ? (
				<p className="empty-state">Пока нет товаров в корзине.</p>
			) : (
				<div className="grid">
					{products.map(({ id, title, imageUrl, price, selectedSize }) => (
						<Link
							key={`${id}-${selectedSize || 'nosize'}`}
							className="card"
							to={`/product/${id}`}
						>
							<img src={imageUrl} alt={title} />
							<div className="title">{title}</div>
							{!!selectedSize && (
								<div className="size">Размер: {selectedSize}</div>
							)}
							<div className="price">{price} ₽</div>
							<Icon
								id="fa-trash-o"
								size="21px"
								margin="0 12px 12px auto"
								onClick={(event) =>
									onProductRemove(event, id, selectedSize)
								}
							/>
						</Link>
					))}
				</div>
			)}
			<div className="final-price">
				{products.length === 0 ? (
					<></>
				) : (
					<div>
						<H2>Итого: {totalPrice} ₽ </H2>
						<ButtonBuy>Оформить заказ</ButtonBuy>
					</div>
				)}
			</div>
		</div>
	);
};

export const Cart = styled(CartContainer)`
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

	& .size {
		padding: 0 12px 8px;
		font-size: 16px;
		color: #5e4f3d;
	}

	& .price {
		padding: 0 12px 14px;
		font-size: 18px;
		color: #403f3f;
		font-weight: 600;
	}
`;
