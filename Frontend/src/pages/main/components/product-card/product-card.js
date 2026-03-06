import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductCardContainer = ({ className, id, title, imageUrl, price }) => {
	return (
		<div className={className}>
			<Link to={`/product/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="product-card-footer">
					<h3>{title}</h3>
					<div className="product-card-info">
						<h4>{price} ₽</h4>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	flex: 0 0 260px;
	max-width: 260px;

	& a {
		display: flex;
		flex-direction: column;
		height: 100%;
		text-decoration: none;
		color: inherit;
		border-radius: 14px;
		overflow: hidden;
		background: #fff8ef;
		border: 1px solid #ead4ba;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	& a:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 18px rgba(0, 0, 0, 0.14);
	}

	& img {
		width: 100%;
		height: 320px;
		object-fit: cover;
	}

	& .product-card-footer {
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	& h3 {
		font-size: 17px;
		line-height: 1.3;
		color: #2f2f2f;
		margin: 0;
		min-height: 44px;
	}

	& h4 {
		margin: 0;
		font-size: 20px;
		color: #b67933;
	}

	& .product-card-info {
		margin-top: auto;
	}
`;
