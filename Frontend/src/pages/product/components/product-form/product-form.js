import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils/sanitize-content';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveProductAsync } from '../../../../actions';

const ProductFormContainer = ({
	className,
	product: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titlelValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			saveProductAsync({
				imageUrl: imageUrlValue,
				title: titlelValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/product/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение...."
				onChange={onImageChange}
			/>
			<Input
				value={titlelValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="product-text"
			>
				{content}
			</div>
		</div>
	);
};

export const ProductForm = styled(ProductFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .product-text {
		min-height: 80px;
		border: 1px solid black;
		font-size: 18px;
		white-space: pre-line;
	}
`;
