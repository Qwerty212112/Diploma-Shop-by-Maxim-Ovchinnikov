import React, { useState } from 'react';
import styled from 'styled-components';

const AboutProductContainer = ({ className, content, gender }) => {
	const [open, setOpen] = useState(true);

	const attributes = [
		{ label: 'Артикул', value: content.articul },
		{ label: 'Пол', value: gender },
		{ label: 'Состав', value: content.composition },
		{ label: 'Стиль', value: content.style },
		{ label: 'Застёжка', value: content.zipper },
		{ label: 'Узор', value: content.pattern },
		{ label: 'Крой', value: content.cut },
		{ label: 'Посадка', value: content.boarding },
	];

	return (
		<div className={className}>
			<div className="infoCol">
				<button className="accordionHeader" onClick={() => setOpen((s) => !s)}>
					{open ? 'Скрыть параметры' : 'Показать параметры'}
				</button>
				<div
					className="accordionContent"
					style={{
						height: open ? `${attributes.length * 50}px` : '0px',
						padding: open ? '0 0 0 0' : '0 0',
					}}
				>
					{attributes.map((attribut) => (
						<h4 key={attribut.label} className="product_atribut">
							{attribut.label}: {attribut.value}
						</h4>
					))}
				</div>
			</div>
		</div>
	);
};

export const AboutProduct = styled(AboutProductContainer)`
	display: flex;
	align-items: flex-start;
	gap: 20px;
	color: #e0b682;
	font-size: 18px;
	text-shadow: 0 1px 0 #000;
	white-space: pre-line;

	.infoCol {
		flex: 1;
		min-width: 0;
	}

	.accordionHeader {
		background: transparent;
		border: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		padding: 6px 0;
		text-align: left;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 0 8px;
	}

	.accordionContent {
		overflow: hidden;
		transition:
			height 0.3s ease,
			padding 0.3s ease;
	}

	.product_atribut {
		margin: 18px 0;
	}
`;
