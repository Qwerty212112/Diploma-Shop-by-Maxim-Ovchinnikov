import styled from 'styled-components';

const ButtonAthorizeContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const ButtonAthorize = styled(ButtonAthorizeContainer)`
	display: inline-block;
	padding: 0.75rem 1.25rem;
	border: 1px solid #fffafa;
	border-radius: 10rem;
	color: #fff;
	text-transform: uppercase;
	font-size: 1rem;
	letter-spacing: 0.15rem;
	transition: all 0.3s;
	position: relative;
	overflow: hidden;
	z-index: 1;
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #e0b682;
		border-radius: 10rem;
		z-index: -2;
	}
	&:before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0%;
		height: 100%;
		background-color: #91816f;
		transition: all 0.8s;
		border-radius: 10rem;
		z-index: -1;
	}
	&:hover {
		cursor: pointer;
		color: #fffafa;
		&:before {
			width: 100%;
		}
	}
`;
