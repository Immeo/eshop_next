import { Cards } from '@/components/Cards/Cards';
import { API } from '@/helpers/api';
import { IMenu } from '@/interfaces/menu';
import { IAllProducts, IProduct } from '@/interfaces/products';
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

function Home({ menu, products }: HomeProps) {
	return (
		<>
			<Cards products={products} />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps = async () => {
	try {
		const { data: menu } = await axios.get<IMenu[]>(API.byCategory.all);
		if (!menu) {
			return {
				notFound: true
			};
		}
		const { data: products } = await axios.get<IProduct[]>(
			API.byProduct.someAndSort('rating', 'asc', 6)
		);
		return {
			props: {
				menu,
				products
			}
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				menu: []
			}
		};
	}
};

interface HomeProps extends Record<string, unknown> {
	menu: IMenu[];
	products: IAllProducts;
}
