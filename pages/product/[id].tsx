import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { API } from '@/helpers/api';
import { IAllProducts, IProduct } from '@/interfaces/products';
import { withLayout } from '@/layout/Layout';
import styles from './Product.module.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
const abs = (url: string) =>
	url?.startsWith('http') ? url : `${SITE_URL}${url || ''}`;

function ProductPage({
	product
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();

	if (router.isFallback) {
		return <div className={styles.skeleton}>Loading produc</div>;
	}

	if (!product) {
		return <div>Product not found</div>;
	}

	const title = `Eshop — ${product.title}`;
	const description = (product.description || '').slice(0, 160);
	const image = product.images?.[0] || '/placeholder.png';

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta property='og:title' content={title} />
				<meta property='og:description' content={description} />
				<meta property='og:type' content='product' />
				<meta property='og:image' content={abs(image)} />
			</Head>
			<div className={styles.wrapper}>
				<div className={styles.productImage}>
					<Image
						src={image}
						alt={product.title}
						width={600}
						height={600}
						sizes='(max-width: 768px) 100vw, 600px'
						priority
					/>
				</div>

				<div className={styles.productInfo}>
					<h1 className={styles.productTitle}>{product.title}</h1>
					<p className={styles.productDescription}>{product.description}</p>
					<p className={styles.productPrice}>
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'USD'
						}).format(product.price)}
					</p>
				</div>
			</div>
		</>
	);
}

export default withLayout(ProductPage);

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const res = await fetch(API.byProduct.all);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = (await res.json()) as IAllProducts;

		const paths = data.products
			.slice(0, 1000)
			.map(p => ({ params: { id: String(p.id) } }));

		return { paths, fallback: 'blocking' };
	} catch {
		return { paths: [], fallback: 'blocking' };
	}
};

type ProductPageProps = { product: IProduct };

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({
	params
}) => {
	const raw = params?.id;
	const id = Array.isArray(raw) ? raw[0] : raw;

	if (!id || !/^\d+$/.test(id)) {
		return { notFound: true };
	}

	try {
		const res = await fetch(API.byProduct.solo(id));
		if (res.status === 404) return { notFound: true };
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const product = (await res.json()) as IProduct;

		return {
			props: { product },
			revalidate: 60 // ISR: обновлять раз в минуту
		};
	} catch {
		// Если упали — пусть 404, чтобы не отдавать “битую” страницу
		return { notFound: true };
	}
};
