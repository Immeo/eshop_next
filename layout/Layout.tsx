import { IMenuContext, MenuContextProvider } from '@/context/menu/menu.context';
import { EshopProductsProps } from '@/pages/category/[alias]';
import React from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';

export const Layout = ({ children }: LayoutProps): React.JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<main className={styles.main}>{children}</main>
			<Footer className={styles.footer} />
		</div>
	);
};

export const withLayout = <
	T extends Record<string, unknown> & IMenuContext & EshopProductsProps
>(
	Component: React.FC<T>
) => {
	return function withLayoutComponent(props: T): React.JSX.Element {
		return (
			<MenuContextProvider menu={props.menu}>
				<Layout>
					<Component {...props} />
				</Layout>
			</MenuContextProvider>
		);
	};
};
