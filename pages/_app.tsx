import '@/styles/globals.css';
import '@/styles/normalize.css';
import type { AppProps } from 'next/app';
import { DM_Serif_Text } from 'next/font/google';
import Head from 'next/head';

const font = DM_Serif_Text({
	subsets: ['latin'],
	weight: ['400']
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Eshop - Find your product</title>
			</Head>
			<div className={font.className}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
