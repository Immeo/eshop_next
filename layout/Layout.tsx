import React from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';

export const Layout = ({ children }: LayoutProps): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};
