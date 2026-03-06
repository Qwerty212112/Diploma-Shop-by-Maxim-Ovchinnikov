import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { PAGINATION_LIMIT } from '../../bff/constants';
import { H2 } from '../../components';
import { Pagination, ProductCard } from '../main/components';
import { request } from '../../utils/request';

const CategoryProductContainer = ({ className }) => {
	const { gender } = useParams();
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	useEffect(() => {
		setPage(1);
	}, [gender]);

	useEffect(() => {
		request(
			`/products?search=&page=${page}&limit=${PAGINATION_LIMIT}&gender=${encodeURIComponent(gender || '')}`,
		).then((response) => {
			if (response.error) {
				return;
			}

			const loadedProducts = response.data?.products || [];
			const calculatedLastPage = Math.max(1, Number(response.data?.lastPage) || 1);

			setProducts(loadedProducts);
			setLastPage(calculatedLastPage);
			if (page > calculatedLastPage) {
				setPage(calculatedLastPage);
			}
		});
	}, [page, gender]);

	return (
		<div className={className}>
			<H2>{gender}</H2>
			<div className="products-grid">
				{products.map(({ id, title, imageUrl, price }) => (
					<ProductCard
						key={id}
						id={id}
						title={title}
						imageUrl={imageUrl}
						price={price}
					/>
				))}
			</div>
			{products.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const CategoryProduct = styled(CategoryProductContainer)`
	padding: 24px 40px 60px;
	max-width: 1600px;
	margin: 0 auto;

	& .products-grid {
		border-top: 2px solid black;
		padding-top: 50px;
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
		gap: 22px;
		justify-content: center;
	}
`;
