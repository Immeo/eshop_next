import cn from 'classnames';
import Link from 'next/link';
import React from 'react';
import { Menu } from '../Menu/Menu';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import LogoIcon from './eshop.svg';

export const Header = ({
	className,
	...props
}: HeaderProps): React.JSX.Element => {
	return (
		<header className={cn(styles.header, className)} {...props}>
			<LogoIcon />
			<ul className={styles.list}>
				<li>
					<Link href='/' className={styles.link}>
						Home
					</Link>
				</li>
				<li>
					<Link href='/poduct' className={styles.link}>
						Product
					</Link>
					<Menu />
				</li>
				<li>
					<Link href='/about' className={styles.link}>
						About us
					</Link>
				</li>
			</ul>
		</header>
	);
};
