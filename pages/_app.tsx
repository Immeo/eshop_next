import { Layout } from '@/layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { DM_Serif_Text } from 'next/font/google';

const font = DM_Serif_Text({
	subsets: ['latin'],
	weight: ['400']
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={font.className}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
}
