import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { backgroundFotoAuthorize } from '../../background_foto';
import { Input, ButtonAthorize, H2 } from '../../components';
import { Link, Navigate } from 'react-router';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../bff/constants';
import { request } from '../../utils/request';

const FormStyled = styled.form`
	height: 85%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(253, 243, 231, 0.8);
`;

const StyledLink = styled(Link)`
	text-decoration: underline;
	padding: 5%;
`;

const ErrorMessage = styled.div`
	padding-top: 5%;
`;

const authFormSchema = yup.object().shape({
	login: yup.string().required('Введите ваш логин'),
	password: yup
		.string()
		.required('Пароль не введён')
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(30, 'Пароль должен содержать не больше 30 символов'),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error} `);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<H2>Войти в аккаунт </H2>

				<Input
					type="text"
					placeholder="Ваш Логин"
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>

				<Input
					type="password"
					placeholder="Пароль.."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>

				<ButtonAthorize type="submit" disabled={!!formError}>
					Вперед за покупками
				</ButtonAthorize>

				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Зарегистрироваться</StyledLink>
			</FormStyled>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	width: 100%;
	height: 1000px;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 10%;
	background-image: url(${backgroundFotoAuthorize});
	background-size: cover;
	& > form {
		display: flex;
		flex-direction: column;
	}
`;
