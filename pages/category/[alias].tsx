import { Cards } from '@/components/Cards/Cards';
import { API } from '@/helpers/api';
import { IMenu } from '@/interfaces/menu';
import { IAllProducts } from '@/interfaces/products';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';

function EshopProducts({ products }: EshopProductsProps) {
	if (!products) {
		return <div>Products not found</div>;
	}

	return (
		<>
			<Head>
				<title>Eshop - category {products.products[0].category}</title>
				<meta property='og:title' content={products.products[0].category} />
				<meta name='description' content={products.products[0].description} />
				<meta
					property='og:description'
					content={products.products[0].description}
				/>
				<meta property='og:image' content={products.products[0].images[0]} />
				<meta property='og:type' content='article' />
			</Head>
			{products.products.length ? (
				<div>
					<h2>
						Category: {products.products[0].category}, total products:{' '}
						{products.total}
					</h2>
					<Cards products={products} />
				</div>
			) : (
				<div>Products not found</div>
			)}
		</>
	);
}

export default withLayout(EshopProducts);

export const getStaticPaths = async () => {
	try {
		const { data: menu } = await axios.get<IMenu[]>(API.byCategory.all);
		const paths = menu.map(item => ({
			params: { alias: item.slug }
		}));
		return {
			paths,
			fallback: true
		};
	} catch {
		return {
			paths: [],
			fallback: false
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params) {
		return {
			notFound: true
		};
	}

	try {
		const { data: menu } = await axios.get<IMenu[]>(API.byCategory.all);
		const category = menu.find(item => item.slug === params.alias);
		console.log(`params: ${params}\n category: ${category}`);

		const { data: products } = await axios.get<IAllProducts>(
			API.byCategory.withCategory(`${category?.slug}`)
		);
		if (!products) {
			return {
				notFound: true
			};
		}
		return {
			props: {
				products,
				menu
			}
		};
	} catch {
		return {
			props: {
				products: null
			}
		};
	}
};

export interface EshopProductsProps extends Record<string, unknown> {
	products: IAllProducts;
}
