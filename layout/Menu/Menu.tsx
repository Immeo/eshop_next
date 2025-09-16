import { MenuContext } from '@/context/menu/menu.context';
import Link from 'next/link';
import { useContext } from 'react';

import styles from './Menu.module.css';

export const Menu = ({
	isMenuOpened = false,
	...props
}: {
	isMenuOpened: boolean;
}) => {
	const { menu } = useContext(MenuContext);
	return (
		<ul tabIndex={isMenuOpened ? 0 : -1} className={styles.subMenu} {...props}>
			{menu.map(m => (
				<li
					tabIndex={isMenuOpened ? 0 : -1}
					className={styles.subMenuItem}
					key={m.slug}
				>
					<Link href={m.slug}>{m.name}</Link>
				</li>
			))}
		</ul>
	);
};
