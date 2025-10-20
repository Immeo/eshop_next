import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Rating } from '../Rating/Rating';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export const Card = ({ product }: CardProps): React.JSX.Element => {
	const router = useRouter();
	return (
		<div>
			<div className={styles.card}>
				<div className={styles.image}>
					<img src={product.images[0]} alt={product.title} />
					<Rating rating={product.rating} isEditable={false} />
				</div>
				<div className={styles.info}>
					<h3 className={styles.title}>
						<Link
							href={
								router.query.category
									? `/product/${product.id}`
									: `/product/${product.id}`
							}
						>
							{product.title}
						</Link>{' '}
					</h3>
					{product.discountPercentage ? (
						<div className={styles.prices}>
							<span className={styles.discount}>
								{product.discountPercentage}$
							</span>
							<span className={styles.oldPrice}>{product.price}$</span>
						</div>
					) : (
						<span className={styles.price}>{product.price}$</span>
					)}
				</div>
				<button type='button' className={styles.cart}>
					Add to card
				</button>
				<button type='button' className={styles.buy}>
					Buy now
				</button>
			</div>
		</div>
	);
};
