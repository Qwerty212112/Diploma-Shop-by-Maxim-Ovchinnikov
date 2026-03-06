import {
	nadobaPromoBg,
	belucciPromoBg,
	worldPromoBg,
	manLinkBg,
	womenLinkBg,
	homeLinkBg,
	kidsLinkBg,
} from '../../../../background_foto';
import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3 } from '../../../../components';
import { GENDER } from '../../../../constants';

const CarouselContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 30px;
	padding: 20px;
	max-width: 1600px;
	margin: 0 auto;
`;

const MainSection = styled.div`
	position: relative;
	margin-top: 5%;
	width: 100%;
	height: 100%;
`;

const MainImage = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 12px;
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		display: block;
		transition: transform 0.4s ease;
	}

	&:hover img {
		transform: scale(1.02);
	}
`;

const NavButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%)
		${(props) => (props.prev ? 'translateX(-12px)' : 'translateX(12px)')};
	left: ${(props) => (props.prev ? '16px' : 'unset')};
	right: ${(props) => (props.next ? '16px' : 'unset')};
	z-index: 10;
	width: 48px;
	height: 48px;
	border: none;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.25);
	color: #fff;
	font-size: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0;
	pointer-events: none;
	transition:
		opacity 0.4s ease,
		background-color 0.3s ease,
		transform 0.3s ease;

	${MainImage}:hover & {
		opacity: 0.9;
		pointer-events: auto;
	}

	&:hover {
		background-color: rgba(255, 255, 255, 0.5);
	}
`;

const ProductsGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 20px;
	width: 690px;
	height: 100%;
`;

const ProductCard = styled(Link)`
	display: block;
	width: 325px;
	height: 325px;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	text-decoration: none;
	transition:
		transform 0.3s ease,
		box-shadow 0.3s ease;

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
	}
`;

const ProductImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.4s ease;

	${ProductCard}:hover & {
		transform: scale(1.05);
	}
`;

const MainHeaderContainer = ({ className }) => {
	const carouselImages = [nadobaPromoBg, belucciPromoBg, worldPromoBg];
	const products = [
		{
			id: 1,
			image: womenLinkBg,
			to: `/category/${GENDER.WOMEN}`,
			name: 'Женское',
		},
		{
			id: 2,
			image: manLinkBg,
			to: `/category/${GENDER.MEN}`,
			name: 'Мужское',
		},
		{
			id: 3,
			image: kidsLinkBg,
			to: `/category/${GENDER.KIDS}`,
			name: 'Детское',
		},
		{
			id: 4,
			image: homeLinkBg,
			to: `/category/${GENDER.HOME}`,
			name: 'Для дома',
		},
	];

	const [activeIndex, setActiveIndex] = useState(0);
	const productsRef = useRef(null);
	const [productsHeight, setProductsHeight] = useState(540);

	useLayoutEffect(() => {
		if (productsRef.current) {
			setProductsHeight(productsRef.current.offsetHeight);
		}
	}, [products.length]);

	const goToPrev = () => {
		setActiveIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setActiveIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
	};

	return (
		<CarouselContainer className={className}>
			<MainSection height={productsHeight}>
				<MainImage>
					<img src={carouselImages[activeIndex]} alt={`Слайд ${activeIndex + 1}`} />
					<NavButton prev onClick={goToPrev} aria-label="Предыдущая картинка">
						←
					</NavButton>
					<NavButton next onClick={goToNext} aria-label="Следующая картинка">
						→
					</NavButton>
				</MainImage>
			</MainSection>

			<ProductsGrid ref={productsRef}>
				{products.map((product) => (
					<ProductCard key={product.id} to={product.to}>
						<div
							style={{
								position: 'relative',
								width: '100%',
								height: '100%',
							}}
						>
							<ProductImage src={product.image} alt={`Товар ${product.id}`} />
							<H3>{product.name}</H3>
						</div>
					</ProductCard>
				))}
			</ProductsGrid>
		</CarouselContainer>
	);
};

export const MainHeader = styled(MainHeaderContainer)`
	width: 100%;
	padding: 0;
	gap: 24px;
	align-items: stretch;

	& ${MainSection} {
		margin-top: 0;
		flex: 1 1 0;
		min-width: 0;
	}

	& ${ProductsGrid} {
		width: min(44%, 680px);
		min-width: 320px;
		gap: 16px;
	}

	& ${ProductCard} {
		width: 100%;
		height: 100%;
		min-height: 220px;
	}

	@media (max-width: 1360px) {
		& ${ProductsGrid} {
			width: min(42%, 560px);
		}
	}

	@media (max-width: 1024px) {
		flex-direction: column;

		& ${ProductsGrid} {
			width: 100%;
			min-width: 0;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		& ${ProductsGrid} {
			grid-template-columns: 1fr;
			grid-template-rows: none;
		}
	}
`;
