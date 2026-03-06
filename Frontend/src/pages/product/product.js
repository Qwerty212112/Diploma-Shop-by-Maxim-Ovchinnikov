import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductContent, Comments } from './components';
import styled from 'styled-components';
import { useMatch, useParams } from 'react-router-dom';
import { loadProductAsync, RESET_PRODUCT_DATA } from '../../actions';
import { selectProduct } from '../../selectors';
import { ProductForm } from './components';
import { Error, PrivateContent } from '../../components';
import { ROLE } from '../../constants';

const ProductContainer = ({ className }) => {
	const [error, setError] = useState(null);
	const product = useSelector(selectProduct);
	const dispatch = useDispatch();
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const isEditing = !!useMatch('/product/:id/edit');
	const isCreating = !!useMatch('/product');

	useLayoutEffect(() => {
		dispatch(RESET_PRODUCT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}
		dispatch(loadProductAsync(params.id)).then((productData) => {
			setError(productData.error);
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificProductPage =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<ProductForm product={product} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<ProductContent product={product} />
				<Comments comments={product.comments} productId={product.id} />
			</div>
		);

	return error ? <Error error={error} /> : SpecificProductPage;
};

export const Product = styled(ProductContainer)`
	margin: 40px 0;
	padding: 40px 80px;
`;
