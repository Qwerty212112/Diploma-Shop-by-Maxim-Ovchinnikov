import { Link } from 'react-router';
import styled from 'styled-components';

const TitleBlog = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const LinkStyled = styled(Link)`
	color: #e0b682;
	&:hover {
		color: #7c5627;
	}
`;

const TextBlog = styled.div`
	margin-top: 15px;
	font-size: 15px;
`;

const DiliveryBlogContainer = ({ className }) => (
	<div className={className}>
		<TitleBlog>Покупка онлайн</TitleBlog>
		<TextBlog>
			<LinkStyled>Доставка по всей России</LinkStyled>
		</TextBlog>
		<TextBlog>
			<LinkStyled>Оплата</LinkStyled>
		</TextBlog>
		<TextBlog>
			<LinkStyled>Выбор размера</LinkStyled>
		</TextBlog>
		<TextBlog>
			<LinkStyled>Возврат</LinkStyled>
		</TextBlog>
		<TextBlog>
			<LinkStyled>Отслеживание заказа</LinkStyled>
		</TextBlog>
	</div>
);

export const DiliveryBlog = styled(DiliveryBlogContainer)`
	width: 25%;
`;
