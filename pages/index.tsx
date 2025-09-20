import { API } from '@/helpers/api';
import { IMenu } from '@/interfaces/menu';
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

function Home({ menu }: HomeProps) {
	return <h1>try</h1>;
}

export default withLayout(Home);

export const getStaticProps = async () => {
	try {
		const { data: menu } = await axios.get<IMenu[]>(API.byCategory.all);
		return {
			props: {
				menu
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
}
