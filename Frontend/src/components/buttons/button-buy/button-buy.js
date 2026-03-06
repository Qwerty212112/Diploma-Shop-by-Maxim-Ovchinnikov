import { useState } from 'react';
import styled from 'styled-components';

const ButtonBuyContainer = ({ children, className, ...p }) => {
	const [pushed, setPushed] = useState(false);
	return (
		<button
			className={className}
			onMouseDown={() => setPushed(true)}
			onMouseUp={() => setPushed(false)}
			onMouseLeave={() => setPushed(false)}
			aria-pressed={pushed}
			{...p}
		>
			{children}
		</button>
	);
};

export const ButtonBuy = styled(ButtonBuyContainer)`
	display: inline-block;
	padding: 0.9rem 1.6rem;
	border: 2px solid #fff;
	border-radius: 999px;
	color: #fff;
	text-transform: uppercase;
	font-size: 1rem;
	background: linear-gradient(135deg, #ff7a59 0%, #e14f4f 100%);
	cursor: pointer;
	transition:
		transform 0.05s ease,
		background 0.08s ease;

	&[aria-pressed='true'],
	&:active {
		background: linear-gradient(135deg, #e14f4f 0%, #c33f3f 100%);
		transform: translateX(2px) translateY(1px);
	}

	&:hover {
		background: linear-gradient(135deg, #ff8e70 0%, #e25c3a 100%);
	}
`;
