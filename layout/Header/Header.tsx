import cn from 'classnames';
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
					<a href='/'>Home</a>
				</li>
				<li>
					<a href='/poduct'>Product</a>
					<Menu />
				</li>
				<li>
					<a href='/about'>About us</a>
				</li>
			</ul>
		</header>
	);
};
