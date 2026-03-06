import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions/add-comment-async';
import { ROLE } from '../../../../constants';

const CommentsContainer = ({ className, comments, productId }) => {
	const [newComment, setNewComment] = useState('');
	const [selectedRating, setSelectedRating] = useState(5);
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (productId, content, rating) => {
		dispatch(addCommentAsync(productId, content, rating));
		setNewComment('');
		setSelectedRating(5);
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<div className="new-comment-main">
						<div className="rating-picker">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									type="button"
									key={star}
									className={`rating-star ${
										star <= selectedRating ? 'is-active' : ''
									}`}
									onClick={() => setSelectedRating(star)}
									aria-label={`Оценка ${star}`}
								>
									{'\u2605'}
								</button>
							))}
						</div>
						<textarea
							name="comment"
							value={newComment}
							placeholder="Ваш отзыв..."
							onChange={({ target }) => setNewComment(target.value)}
						></textarea>
					</div>
					<Icon
						id="fa-paper-plane-o"
						size="18px"
						margin="0 0 0 10px"
						onClick={() =>
							onNewCommentAdd(productId, newComment, selectedRating)
						}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt, rating }) => (
					<Comment
						key={id}
						id={id}
						productId={productId}
						author={author}
						content={content}
						publishedAt={publishedAt}
						rating={rating}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: min(100%, 680px);
	margin: 30px auto 0;
	padding: 20px;
	border-radius: 14px;

	& .new-comment {
		display: flex;
		align-items: flex-end;
		gap: 12px;
		width: 100%;
		margin: 0 0 20px;
	}

	& .new-comment-main {
		width: 100%;
	}

	& .rating-picker {
		display: flex;
		gap: 6px;
		margin: 0 0 8px;
	}

	& .rating-star {
		border: none;
		background: transparent;
		color: #6f6f6f;
		font-size: 24px;
		line-height: 1;
		padding: 0;
		cursor: pointer;
		transition: color 0.15s ease;
	}

	& .rating-star.is-active {
		color: #e0b682;
	}

	& .new-comment textarea {
		width: 100%;
		min-height: 110px;
		padding: 12px 14px;
		font-size: 16px;
		line-height: 1.45;
		background: rgba(190, 128, 77, 0.62);
		border: 1px solid black;
		border-radius: 10px;
		outline: none;
		resize: none;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	& .new-comment textarea:focus {
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
	}

	& .new-comment textarea::placeholder {
		color: #000000;
	}

	& .comments {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
`;
