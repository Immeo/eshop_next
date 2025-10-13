import { Cards } from '@/components/Cards/Cards';
import { API } from '@/helpers/api';
import { IAllProducts } from '@/interfaces/products';
import { withLayout } from '@/layout/Layout';
import axios from 'axios';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

function Home({ products }: HomeProps) {
	return (
		<>
			<Cards products={products} />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps = async () => {
	try {
		const { data: products } = await axios.get<IAllProducts>(
			API.byProduct.someAndSort('rating', 'asc', 6)
		);
		return {
			props: {
				products
			}
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				products: []
			}
		};
	}
};

interface HomeProps extends Record<string, unknown> {
	products: IAllProducts;
}
