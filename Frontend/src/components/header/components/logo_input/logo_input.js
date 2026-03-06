import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from './picture_logo.png';

const Img = styled.img`
	height: 120px;
`;

const Input = styled.input`
	height: 50px;
	width: 100%;
	background-color: #e0b682;
	font-size: 25px;
	color: #eee;
	outline: none;
	border: 1px solid #fffafa;
	border-radius: 10rem;
	padding-left: 7px;

	&::placeholder {
		color: #eee;
	}
`;

const LogoContainer = ({ className }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const onSearch = ({ target }) => {
		const searchValue = target.value;
		const searchParams = new URLSearchParams();

		if (searchValue.trim()) {
			searchParams.set('search', searchValue);
		}

		navigate(
			{
				pathname: '/',
				search: searchParams.toString()
					? `?${searchParams.toString()}`
					: '',
			},
			{ replace: true },
		);
	};

	return (
		<div className={className}>
			<Link className={className} to="/">
				<Img src={logo} alt="Логотип" />
			</Link>
			<Input
				value={new URLSearchParams(location.search).get('search') || ''}
				placeholder="Найти одежду..."
				onChange={onSearch}
			></Input>
		</div>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 30%;
`;
