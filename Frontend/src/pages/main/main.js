import styled from 'styled-components';
import { MainHeader, Pagination, ProductCard } from './components';
import { useEffect, useState } from 'react';
import { PAGINATION_LIMIT } from '../../bff/constants';
import { useSearchParams } from 'react-router-dom';
import { H2 } from '../../components';
import { request } from '../../utils/request';

const MainContainer = ({ className }) => {
	const [searchParams] = useSearchParams();
	const searchPhrase = searchParams.get('search') || '';
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const isSearchResultEmpty = Boolean(searchPhrase.trim()) && products.length === 0;

	useEffect(() => {
		setPage(1);
	}, [searchPhrase]);

	useEffect(() => {
		request(
			`/products?search=${encodeURIComponent(searchPhrase)}&page=${page}&limit=${PAGINATION_LIMIT}`,
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
	}, [page, setPage, searchPhrase]);

	return (
		<div className={className}>
			<MainHeader />
			<div className="products-grid">
				{isSearchResultEmpty ? (
					<H2>Товаров по запросу не найдено</H2>
				) : (
					products.map(({ id, title, imageUrl, price }) => (
						<ProductCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							price={price}
						/>
					))
				)}
			</div>
			{!isSearchResultEmpty && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	padding: 24px 40px 60px;
	max-width: 1600px;
	margin: 0 auto;

	& .products-grid {
		border-top: 2px solid black;
		padding-top: 50px;
		margin-top: 100px;
		display: flex;
		flex-wrap: wrap;
		gap: 22px;
		justify-content: center;
	}
`;
