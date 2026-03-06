import { Routes, Route } from 'react-router';
import { Header, Footer, Modal, H2 } from './components';
import styled from 'styled-components';
import {
	AdminSetting,
	Authorization,
	Registration,
	Users,
	Main,
	Product,
	Favorites,
	ProductCreacte,
	CategoryProduct,
} from './pages';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';
import { Cart } from './pages/cart/cart';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justufy-content: space-between;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

const Content = styled.div`
	flex: 1;
`;

export const Store = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/admin_setting" element={<AdminSetting />} />
					<Route path="/users" element={<Users />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/category/:gender" element={<CategoryProduct />} />
					<Route path="/product/create" element={<ProductCreacte />} />
					<Route path="/product/:id/edit" element={<ProductCreacte />} />
					<Route
						path="*"
						element={
							<div>
								<H2>Такой странциы не существует</H2>
							</div>
						}
					/>
				</Routes>
			</Content>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
