import Image from 'next/image';
import React from 'react';
import styles from './Card.module.css';
import { CardProps } from './Card.props';

export const Card = ({ product }: CardProps): React.JSX.Element => {
	return (
		<div>
			<div className={styles.card}>
				{product.images.map(image => (
					<Image
						key={image}
						src={image}
						alt={product.title}
						width={200}
						height={200}
					/>
				))}
				<div className={styles.info}>
					<h3 className={styles.title}>{product.title}</h3>
					<p className={styles.description}>{product.description}</p>
					<span className={styles.price}>{product.price}</span>
				</div>
			</div>
		</div>
	);
};
