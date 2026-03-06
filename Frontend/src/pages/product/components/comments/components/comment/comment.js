import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, CLOSE_MODAL, removeCommentAsync } from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constants';

const CommentContainer = ({
	className,
	id,
	author,
	productId,
	publishedAt,
	content,
	rating = 0,
}) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(productId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);
	const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0));

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 6px 0 0"
							size="18px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-block">
						<div className="published-at">
							<Icon id="fa-calendar-o" margin="0 10px 0 0" size="18px" />
							{publishedAt}
						</div>
						<div
							className="comment-rating"
							aria-label={`Оценка: ${normalizedRating} из 5`}
						>
							<span className="rating-filled">
								{'\u2605'.repeat(normalizedRating)}
							</span>
							<span className="rating-empty">
								{'\u2606'.repeat(5 - normalizedRating)}
							</span>
						</div>
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					size="21px"
					margin="0 0 0 10px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	align-items: flex-start;
	gap: 10px;

	& .comment {
		width: 100%;
		padding: 12px 14px;
		border: 1px solid black;
		border-radius: 12px;
		background: rgba(255, 187, 135, 0.48);
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 10px;
		margin-bottom: 8px;
		padding-bottom: 8px;
		border-bottom: 1px solid black;
	}

	& .author {
		display: flex;
		align-items: center;
		font-weight: 600;
	}

	& .published-block {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
	}

	& .published-at {
		display: flex;
		align-items: center;
		opacity: 0.9;
	}

	& .comment-rating {
		font-size: 16px;
		line-height: 1;
	}

	& .rating-filled {
		color: #e0b682;
	}

	& .rating-empty {
		color: #d0d0d0;
	}

	& .comment-text {
		font-size: 16px;
		line-height: 1.45;
		white-space: pre-wrap;
		word-break: break-word;
	}
`;
