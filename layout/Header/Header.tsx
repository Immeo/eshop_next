import cn from 'classnames';
import React from 'react';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

export const Header = ({
	className,
	...props
}: HeaderProps): React.JSX.Element => {
	return (
		<header className={cn(styles.header, className)} {...props}>
			хедер
		</header>
	);
};
