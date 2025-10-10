'use client';

import { Cards } from '@/components/Cards/Cards';
import { API } from '@/helpers/api';
import { IAllProducts } from '@/interfaces/products';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Search() {
	const [products, setProducts] = useState<IAllProducts | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const params = useSearchParams();
	const search = params.get('q');
	console.log(`search: ${search}`);

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
		<>
			<div>Search: {search || '—'}</div>

			{isLoading && <div>Loading...</div>}

			{error && (
				<div role='alert' style={{ color: 'crimson' }}>
					{error}
				</div>
			)}

			{!isLoading && !error && !search && (
				<div>Enter search query in address bar (?q=...)</div>
			)}

			{!isLoading && !error && search && products && (
				<Cards products={products} />
			)}

			{!isLoading && !error && search && !products && <div>Nothing found</div>}
		</>
	);
}

export default withLayout(Search);
