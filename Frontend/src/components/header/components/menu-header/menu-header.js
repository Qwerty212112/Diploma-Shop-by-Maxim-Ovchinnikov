import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GENDER } from '../../../../constants';
const BlockMenu = styled(NavLink)`
	font-size: 25px;
	font-weight: bold;
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	height: 44px;
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
	box-sizing: border-box;
	transition:
		background-color 0.2s ease,
		color 0.2s ease;
	text-decoration: none;
	color: #e0b682;

	&:hover {
		background-color: #e0b682;
		height: 50%;
		color: #eee;
	}

	&.active {
		background-color: #e0b682;
		height: 100%;
		color: #fff;
	}
`;

const MenuContainer = ({ className }) => (
	<div className={className}>
		<BlockMenu to={`/category/${GENDER.MEN}`}>Мужское</BlockMenu>
		<BlockMenu to={`/category/${GENDER.WOMEN}`}>Женское</BlockMenu>
		<BlockMenu to={`/category/${GENDER.KIDS}`}>Детское </BlockMenu>
		<BlockMenu to={`/category/${GENDER.HOME}`}>Для дома</BlockMenu>
	</div>
);

export const Menu = styled(MenuContainer)`
	display: flex;
	align-items: center;
	gap: 10px;
	width: 30%;
`;
