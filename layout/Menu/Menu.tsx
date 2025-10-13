import cn from 'classnames';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import { API } from '@/helpers/api';
import type { IMenu } from '@/interfaces/menu';
import useSWR from 'swr';
import styles from './Menu.module.css';

type MenuProps = {
	isMenuOpened?: boolean;
	className?: string;
} & ComponentPropsWithoutRef<'ul'>;

const fetcher = (url: string) =>
	fetch(url, { cache: 'no-store' }).then(r => {
		if (!r.ok) throw new Error('Network error');
		return r.json();
	});

export const Menu = ({
	isMenuOpened = false,
	className,
	...props
}: MenuProps) => {
	const { data, error, isLoading } = useSWR<IMenu[]>(
		API.byCategory.all,
		fetcher,
		{
			revalidateOnFocus: false
		}
	);

	const showList =
		isMenuOpened && !isLoading && !error && data && data.length > 0;
	const isEmpty =
		isMenuOpened && !isLoading && !error && (!data || data.length === 0);

	return (
		<nav aria-label='Categories'>
			{isMenuOpened && (
				<ul
					{...props}
					className={cn(styles.subMenu, className)}
					role='menu'
					aria-busy={isLoading || undefined}
				>
					{isLoading && (
						<li role='status' aria-live='polite' className={styles.loading}>
							Loading...
						</li>
					)}

					{error && (
						<li role='alert' className={styles.error}>
							Failed to load menu. Try refreshing the page.
						</li>
					)}

					{showList &&
						data!.map(item => (
							<li key={item.slug} role='none'>
								<Link href={`/category/${item.slug}`} role='menuitem' prefetch>
									{item.name}
								</Link>
							</li>
						))}

					{isEmpty && <li className={styles.empty}>Empty</li>}
				</ul>
			)}
		</nav>
	);
};
