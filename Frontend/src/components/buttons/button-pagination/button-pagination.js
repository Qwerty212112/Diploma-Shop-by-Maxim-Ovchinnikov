import styled from 'styled-components';

const ButtonPaginationContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const ButtonPagination = styled(ButtonPaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ width = '100%' }) => width};
	height: 38px;
	border-radius: 10px;
	border: 1px solid #d8b992;
	background: linear-gradient(180deg, #fffdf9 0%, #f5e2cb 100%);
	color: #3d2b17;
	font-weight: 600;
	font-size: 15px;
	letter-spacing: 0.01em;
	transition:
		transform 0.18s ease,
		box-shadow 0.18s ease,
		background-color 0.18s ease,
		opacity 0.18s ease;

	&:not(:disabled):hover {
		transform: translateY(-1px);
		box-shadow: 0 8px 14px rgba(84, 50, 17, 0.18);
		background: linear-gradient(180deg, #fff6e8 0%, #f2d9b8 100%);
	}

	&:disabled {
		opacity: 0.5;
		filter: grayscale(0.15);
	}

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;
