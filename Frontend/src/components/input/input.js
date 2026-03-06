import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});
export const Input = styled(InputContainer)`
	margin: 25px;
	width: 500px;
	height: 50px;
	border-radius: 10px;
	background-color: #e0b682;
`;
