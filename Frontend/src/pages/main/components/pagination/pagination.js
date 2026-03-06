import styled from 'styled-components';
import { ButtonPagination } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	const safeLastPage = Math.max(1, Number(lastPage) || 1);
	const safePage = Math.min(Math.max(1, Number(page) || 1), safeLastPage);

	const goToPage = (nextPage) => {
		setPage(Math.min(Math.max(1, nextPage), safeLastPage));
	};

	return (
		<nav className={className} aria-label="Пагинация каталога">
			<ButtonPagination
				disabled={safePage === 1}
				onClick={() => goToPage(1)}
			>
				В начало
			</ButtonPagination>
			<ButtonPagination
				disabled={safePage === 1}
				onClick={() => goToPage(safePage - 1)}
			>
				Назад
			</ButtonPagination>
			<div className="current-page" aria-live="polite">
				<span className="current-page-value">
					{safePage}/{safeLastPage}
				</span>
			</div>
			<ButtonPagination
				disabled={safePage === safeLastPage}
				onClick={() => goToPage(safePage + 1)}
			>
				Вперед
			</ButtonPagination>
			<ButtonPagination
				disabled={safePage === safeLastPage}
				onClick={() => goToPage(safeLastPage)}
			>
				В конец
			</ButtonPagination>
		</nav>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: grid;
	grid-template-columns: 1fr 1fr auto 1fr 1fr;
	align-items: center;
	gap: 10px;
	margin: 28px auto 12px;
	padding: 14px;
	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	border-radius: 16px;
	background: linear-gradient(180deg, #fff8ef 0%, #f6e6d3 100%);
	border: 1px solid #ead1b2;
	box-shadow:
		0 10px 24px rgba(63, 44, 23, 0.12),
		inset 0 1px 0 rgba(255, 255, 255, 0.85);

	& > button {
		width: 100%;
	}

	& .current-page {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 0 0 auto;
		min-width: 64px;
		height: 32px;
		padding: 0 10px;
		border-radius: 10px;
		border: 1px solid #ddc09c;
		background: #fff;
		color: #3f3429;
	}

	& .current-page-value {
		font-size: 14px;
		font-weight: 700;
		color: #8b5a2b;
	}

	@media (max-width: 900px) {
		margin-top: 20px;
		padding: 12px;
		grid-template-columns: 1fr 1fr;

		& .current-page {
			order: -1;
			grid-column: 1 / -1;
			justify-content: center;
		}
	}

	@media (max-width: 520px) {
		padding: 10px;
		gap: 8px;

		& > button {
			min-width: 0;
		}

		& .current-page-value {
			font-size: 13px;
		}
	}
`;
