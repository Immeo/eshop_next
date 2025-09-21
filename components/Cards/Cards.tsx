import { IProduct } from '@/interfaces/products';
import { motion } from 'framer-motion';
import React from 'react';
import { Card } from '../Card/Card';
import styles from './Cards.module.css';
import { CardsProps } from './Cards.props';

export const Cards = ({ products }: CardsProps): React.JSX.Element => {
	if (!products) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<motion.ul className={styles.cards} layout>
				{products.products.map((item: IProduct) => (
					<motion.li key={item.id} layout>
						<Card product={item} />
					</motion.li>
				))}
			</motion.ul>
		</>
	);
};
