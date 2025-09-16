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
		<>
			{isMenuOpened && (
				<ul className={styles.subMenu} {...props}>
					{menu.map(m => (
						<li className={styles.subMenuItem} key={m.slug}>
							<Link href={m.slug}>{m.name}</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
};
