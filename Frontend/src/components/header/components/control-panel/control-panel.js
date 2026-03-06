import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../icon/icon';
import { ButtonAthorize } from '../../../buttons/button_authorize/button_authorize';
import { ROLE } from '../../../../bff/constants';
import { selectUserLogin, selectUserRole } from '../../../../selectors';
import { logout } from '../../../../actions';
import { cheackAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	margin: auto;
`;

const LoginButton = styled(Link)`
	color: #eee;
`;

const IconLink = styled(Link)`
	&,
	& * {
		cursor: pointer;
	}
`;

const UserName = styled.div`
	font-size: 25px;
	font-weight: bold;
	margin: 0 0 2px 0;
	color: #e0b682;
`;

const ControlPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const isAdmin = cheackAccess([ROLE.ADMIN], roleId);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<ButtonAthorize>
						<LoginButton to="/login">Войти</LoginButton>
					</ButtonAthorize>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							size="33px"
							margin="0 0 0 10px"
							onClick={onLogout}
						/>
					</>
				)}

				<IconLink to="/cart">
					<Icon id="fa-cart-plus" size="35px" margin="0 0 7px 25px" />
				</IconLink>

				<IconLink to="/favorites">
					<Icon id="fa-heart-o" size="32px" margin="0 0 7px 25px" />
				</IconLink>

				{isAdmin && (
					<IconLink to="/admin_setting">
						<Icon id="fa-cogs" size="32px" margin="0 0 7px 25px" />
					</IconLink>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	width: 30%;
`;
