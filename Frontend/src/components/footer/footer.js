import styled from 'styled-components';
import { ContactsBlog, DiliveryBlog, BuyerBlog, Company } from './components';

const FooterContainer = ({ className }) => (
	<div className={className}>
		<ContactsBlog></ContactsBlog>
		<DiliveryBlog></DiliveryBlog>
		<BuyerBlog></BuyerBlog>
		<Company></Company>
	</div>
);

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-item: center;
	width: 100%;
	height: 400px;
	background-color: #fdf3e7;
	padding: 25px;
	color: #e0b682;
`;
