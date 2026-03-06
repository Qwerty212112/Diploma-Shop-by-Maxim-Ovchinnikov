import styled from 'styled-components';
import { ControlPanel, Logo, Menu } from './components';

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Menu />
		<Logo></Logo>
		<ControlPanel></ControlPanel>
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	height: 120px;
	background-color: #fdf3e7;
`;
