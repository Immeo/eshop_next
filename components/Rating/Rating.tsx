import cn from 'classnames';
import React, {
	ForwardedRef,
	KeyboardEvent,
	forwardRef,
	useEffect,
	useRef,
	useState
} from 'react';
import styles from './Rating.module.css';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';

export const Rating = forwardRef(
	(
		{
			isEditable = false,
			error,
			rating,
			setRating,
			tabIndex,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): React.JSX.Element => {
		const [ratingArray, setRatingArray] = useState<React.JSX.Element[]>(
			new Array(5).fill(<></>)
		);
		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

		useEffect(() => {
			constructRating(rating);
		}, [rating, tabIndex]);

		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1;
			}
			if (!rating && i == 0) {
				return tabIndex ?? 0;
			}
			if (r == i + 1) {
				return tabIndex ?? 0;
			}
			return -1;
		};

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map(
				(r: React.JSX.Element, i: number) => {
					return (
						<span
							key={i}
							role={isEditable ? 'spinbutton' : ''}
							aria-label={
								isEditable
									? 'Select a rating'
									: `Rating is ${rating} out of 5 stars`
							}
							aria-valuemin={1}
							aria-valuemax={5}
							aria-valuenow={rating}
							aria-invalid={!!error}
							aria-valuetext={`${rating} out of 5 stars`}
							className={cn(styles.star, {
								[styles.filled]: i < currentRating,
								[styles.editable]: isEditable
							})}
							onMouseEnter={() => changeDispay(i + 1)}
							onMouseLeave={() => changeDispay(rating)}
							onClick={() => onClick(i + 1)}
							tabIndex={computeFocus(rating, i)}
							onKeyDown={handleKey}
							ref={el => {
								ratingArrayRef.current[i] = el;
							}}
						>
							<StarIcon />
						</span>
					);
				}
			);
			setRatingArray(updatedArray);
		};

		const changeDispay = (i: number) => {
			if (!isEditable) {
				return;
			}
			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(i);
		};

		const handleKey = (e: KeyboardEvent) => {
			if (!isEditable || !setRating) {
				return;
			}
			if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
				if (!rating) {
					setRating(1);
				} else {
					e.preventDefault();
					setRating(rating < 5 ? rating + 1 : 5);
				}
				ratingArrayRef.current[rating]?.focus();
			}
			if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
				e.preventDefault();
				setRating(rating > 1 ? rating - 1 : 1);
				ratingArrayRef.current[rating - 2]?.focus();
			}
		};

		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.ratingWrapper, {
					[styles.error]: error
				})}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && (
					<span role='alert' className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
