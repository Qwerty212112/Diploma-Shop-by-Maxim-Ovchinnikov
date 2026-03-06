import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonAthorize, H2, Input, PrivateContent } from '../../components';
import { ROLE } from '../../constants';
import { saveProductAsync } from '../../actions';
import { request } from '../../utils/request';

const initialFormData = {
	title: '',
	imageUrl: '',
	gender: '',
	articul: '',
	composition: '',
	style: '',
	zipper: '',
	pattern: '',
	cut: '',
	boarding: '',
	sizes: '',
	price: '',
	publishedAt: '',
};

const ProductCreateContainer = ({ className }) => {
	const { id: editProductId } = useParams();
	const isEditMode = Boolean(editProductId);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [isLoadingProduct, setIsLoadingProduct] = useState(isEditMode);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!isEditMode) {
			setFormData(initialFormData);
			setIsLoadingProduct(false);
			return;
		}

		setIsLoadingProduct(true);
		request(`/products/${editProductId}`)
			.then(({ error: loadError, data }) => {
				if (loadError || !data) {
					setError('Не удалось загрузить товар для редактирования');
					return;
				}

				const content = data.content || {};
				setFormData({
					title: data.title || '',
					imageUrl: data.imageUrl || '',
					gender: data.gender || '',
					articul: content.articul || '',
					composition: content.composition || '',
					style: content.style || '',
					zipper: content.zipper || '',
					pattern: content.pattern || '',
					cut: content.cut || '',
					boarding: content.boarding || '',
					sizes: (data.sizes || []).join(', '),
					price: String(data.price ?? ''),
					publishedAt: data.publishedAt || '',
				});
			})
			.finally(() => setIsLoadingProduct(false));
	}, [isEditMode, editProductId]);

	const onFieldChange = ({ target }) => {
		setFormData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (!formData.title.trim() || !formData.imageUrl.trim()) {
			setError('Заполните обязательные поля: название и ссылка на фото');
			return;
		}

		const parsedSizes = formData.sizes
			.split(',')
			.map((size) => size.trim())
			.filter(Boolean);
		const parsedPrice = Number(formData.price);
		const requiredContentFields = [
			formData.articul,
			formData.composition,
			formData.style,
			formData.zipper,
			formData.pattern,
			formData.cut,
			formData.boarding,
		].map((value) => value.trim());

		if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
			setError('Цена должна быть положительным числом');
			return;
		}

		if (
			!formData.gender.trim() ||
			requiredContentFields.some((value) => !value) ||
			parsedSizes.length === 0
		) {
			setError('Заполните все обязательные характеристики товара');
			return;
		}

		setError('');

		dispatch(
			saveProductAsync({
				id: isEditMode ? editProductId : '',
				title: formData.title.trim(),
				imageUrl: formData.imageUrl.trim(),
				gender: formData.gender.trim(),
				publishedAt: formData.publishedAt,
				content: {
					articul: formData.articul.trim(),
					composition: formData.composition.trim(),
					style: formData.style.trim(),
					zipper: formData.zipper.trim(),
					pattern: formData.pattern.trim(),
					cut: formData.cut.trim(),
					boarding: formData.boarding.trim(),
				},
				sizes: parsedSizes,
				price: parsedPrice,
			}),
		).then((savedProduct) => {
			if (savedProduct?.id) {
				navigate(`/product/${savedProduct.id}`);
			}
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]}>
			<div className={className}>
				<div className="title-product-create">
					<H2>
						{isEditMode
							? 'Редактирование карточки товара'
							: 'Создать карточку товара'}
					</H2>
				</div>

				{isLoadingProduct ? (
					<div className="form-loading">Загрузка данных товара...</div>
				) : (
					<form className="form-product-create" onSubmit={onSubmit}>
						<Input
							name="title"
							value={formData.title}
							onChange={onFieldChange}
							placeholder="Название товара"
						/>
						<Input
							name="imageUrl"
							value={formData.imageUrl}
							onChange={onFieldChange}
							placeholder="Ссылка на фото"
						/>
						<select
							className="gender-select"
							name="gender"
							value={formData.gender}
							onChange={onFieldChange}
						>
							<option value="" disabled>
								Выберите категорию
							</option>
							<option value="Мужской">Мужской</option>
							<option value="Женский">Женский</option>
							<option value="Детский">Детский</option>
							<option value="Для дома">Для дома</option>
						</select>
						<Input
							name="articul"
							value={formData.articul}
							onChange={onFieldChange}
							placeholder="Артикул"
						/>
						<Input
							name="composition"
							value={formData.composition}
							onChange={onFieldChange}
							placeholder="Состав"
						/>
						<Input
							name="style"
							value={formData.style}
							onChange={onFieldChange}
							placeholder="Стиль"
						/>
						<Input
							name="zipper"
							value={formData.zipper}
							onChange={onFieldChange}
							placeholder="Застежка"
						/>
						<Input
							name="pattern"
							value={formData.pattern}
							onChange={onFieldChange}
							placeholder="Узор"
						/>
						<Input
							name="cut"
							value={formData.cut}
							onChange={onFieldChange}
							placeholder="Крой"
						/>
						<Input
							name="boarding"
							value={formData.boarding}
							onChange={onFieldChange}
							placeholder="Посадка"
						/>
						<Input
							name="sizes"
							value={formData.sizes}
							onChange={onFieldChange}
							placeholder="Размеры через запятую (например: 46, 48, 50)"
						/>
						<Input
							name="price"
							value={formData.price}
							onChange={onFieldChange}
							placeholder="Цена"
							type="number"
							min="1"
						/>
						{error && <div className="form-error">{error}</div>}
						<ButtonAthorize type="submit">
							{isEditMode ? 'Сохранить редактирование' : 'Создать товар'}
						</ButtonAthorize>
					</form>
				)}
			</div>
		</PrivateContent>
	);
};

export const ProductCreacte = styled(ProductCreateContainer)`
	& .title-product-create {
		display: flex;
		justify-content: center;
	}

	& .form-product-create {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30px;
	}

	& .form-error {
		color: #b42318;
		font-size: 16px;
		margin-bottom: 16px;
	}

	& .form-loading {
		font-size: 18px;
		text-align: center;
		padding: 20px;
		color: #403f3f;
	}

	& .gender-select {
		margin: 25px;
		width: 500px;
		height: 50px;
		border-radius: 10px;
		background-color: #e0b682;
		border: 1px solid #91816f;
		padding: 0 12px;
		font-size: 16px;
	}
`;
