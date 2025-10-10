import { Cards } from '@/components/Cards/Cards';
import { API } from '@/helpers/api';
import { IAllProducts } from '@/interfaces/products';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './search.module.css';

function Search() {
	const [products, setProducts] = useState<IAllProducts | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const params = useSearchParams();
	const search = params.get('q');

	useEffect(() => {
		if (!search) {
			setProducts(null);
			setError(null);
			setIsLoading(false);
			return;
		}

		const controller = new AbortController();

		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const url = API.byProduct.search(search);
				const res = await axios.get<IAllProducts>(url, {
					signal: controller.signal
				});
				if (!res.data) {
					throw new Error('Nothing found');
				}
				setProducts(res.data);
			} catch (err: any) {
				if (axios.isCancel?.(err)) return;
				console.error(err);
				setError('Failed to load results. Please try again.');
				setProducts(null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [search]);

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>
				Search: {search || '—'}. {search ? `${products?.limit} results` : ''}
			</h2>

			{isLoading && <div>Loading...</div>}

			{error && (
				<div role='alert' className={styles.error}>
					{error}
				</div>
			)}

			{!isLoading && !error && !search && (
				<div className={styles.info}>
					Enter search query in address bar (?q=...)
				</div>
			)}

			{!isLoading && !error && search && products && (
				<Cards products={products} />
			)}

			{!isLoading && !error && search && !products && (
				<div className={styles.info}>Nothing found</div>
			)}
		</div>
	);
}

export default withLayout(Search);
