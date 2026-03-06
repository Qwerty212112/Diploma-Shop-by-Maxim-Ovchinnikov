import styled from 'styled-components';
import { H2 } from '../../components';
import { Link } from 'react-router';
import { ROLE } from '../../constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const AdminSettingContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);

	if (roleId !== ROLE.ADMIN) {
		return (
			<div className={className}>
				<H2>Доступ запрещен</H2>
			</div>
		);
	}

	return (
		<div className={className}>
			<Link to="/product/create">
				<H2>Добавить карточку товара</H2>
			</Link>
			<Link to="/users">
				<H2>База пользователей</H2>
			</Link>
		</div>
	);
};

export const AdminSetting = styled(AdminSettingContainer)`
	display: flex;
	flex-direction: column;
	gap: 50px;
	height: 700px;
	align-items: center;
	justify-content: center;
`;
