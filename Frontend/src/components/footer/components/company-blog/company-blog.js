import styled from 'styled-components';

const TitleBlog = styled.div`
	font-size: 20px;
	font-weight: bold;
`;

const TextBlog = styled.div`
	margin-top: 15px;
	font-size: 15px;
`;

const CompanyContainer = ({ className }) => (
	<div className={className}>
		<TitleBlog>Компания</TitleBlog>
		<TextBlog>Вакансии</TextBlog>
		<TextBlog>О Компании</TextBlog>
		<TextBlog>Сотрудничество</TextBlog>
		<TextBlog>Пресс-офис</TextBlog>
		<TextBlog>Пресс-релизы</TextBlog>
		<TextBlog>Контакты</TextBlog>
	</div>
);

export const Company = styled(CompanyContainer)`
	width: 25%;
`;
