import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removeProductAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { cheackAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onProductRemove = () => {
		dispatch(
			openModal({
				text: 'Удалить карточку товара?',
				onConfirm: () => {
					dispatch(removeProductAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = cheackAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="published-at"></div>
			{isAdmin && (
				<>
					<div className="buttons">
						{editButton}
						{publishedAt && (
							<Icon
								id="fa-trash-o"
								size="21px"
								margin="0 0 0 7px"
								onClick={(id) => onProductRemove()}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
	}
	& i {
		position: relative;
		top: -1px;
	}
	& .published-at {
		display: flex;
		font-size: 18px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
