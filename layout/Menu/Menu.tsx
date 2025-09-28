import { MenuContext } from '@/context/menu/menu.context';
import cn from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';

import styles from './Menu.module.css';

export const Menu = ({
	isMenuOpened = false,
	className,
	...props
}: {
	isMenuOpened: boolean;
	className?: string;
}) => {
	const { menu } = useContext(MenuContext);

	return (
		<>
			{isMenuOpened && (
				<ul {...props} className={cn(styles.subMenu, className)}>
					{menu.map(m => (
						<li className={styles.subMenuItem} key={m.slug}>
							<Link href={`/category/${m.slug}`}>{m.name}</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
};
