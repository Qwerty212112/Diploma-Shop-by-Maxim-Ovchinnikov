import styled from 'styled-components';

const NumberStyled = styled.div`
	font-weight: bold;
	font-size: 25px;
`;

const TextNumberStyled = styled.div`
	font-size: 20px;
`;

const NumberContainer = styled.div`
	margin-top: 20px;
`;

const ContactsContainer = ({ className }) => {
	return (
		<div className={className}>
			<NumberContainer>
				<TextNumberStyled>Бесплатно по России:</TextNumberStyled>
				<NumberStyled>8 800 800 80 80</NumberStyled>
			</NumberContainer>
		</div>
	);
};

export const ContactsBlog = styled(ContactsContainer)`
	width: 25%;
`;
