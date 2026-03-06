import styled from 'styled-components';
import { ButtonAthorize } from '../buttons/button_authorize/button_authorize';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';
import { useSelector } from 'react-redux';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<ButtonAthorize className="button-modal" onClick={onConfirm}>
						Да
					</ButtonAthorize>
					<ButtonAthorize className="button-modal" onClick={onCancel}>
						Отмена
					</ButtonAthorize>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		width: 400px;
		margin: 0 auto;
		padding: 0 20px 20px;
		top: 50%;
		transform: translate(0, -50%);
		text-align: center;
		background-color: white;
		border: 3px solid black;
		z-index: 30;
	}

	& .buttons {
		display: flex;
		justify-content: space-between;
	}

	& .buttons button {
		margin: 0 10px;
	}
	& .button-modal {
		width: 120px;
	}
`;
