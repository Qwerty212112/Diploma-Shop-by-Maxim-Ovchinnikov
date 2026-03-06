import styled from 'styled-components';

const TitleBlog = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const TextBlog = styled.div`
	margin-top: 15px;
	font-size: 15px;
`;

const BuyerBlogContainer = ({ className }) => (
	<div className={className}>
		<TitleBlog>Покупателям</TitleBlog>
		<TextBlog>Магазины</TextBlog>
		<TextBlog>Программы лояльности</TextBlog>
		<TextBlog>Подарочные бонусы</TextBlog>
		<TextBlog>Бонусы за отзывы</TextBlog>
		<TextBlog>Условия возврата</TextBlog>
		<TextBlog>Подарочные сертифакты</TextBlog>
		<TextBlog>Услуги и сервис</TextBlog>
		<TextBlog>Шопинг со стилистом</TextBlog>
	</div>
);

export const BuyerBlog = styled(BuyerBlogContainer)`
	width: 25%;
`;
