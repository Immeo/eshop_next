import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { Menu } from '../Menu/Menu';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import Logo from './eshop.svg';

export const Header = ({
	className,
	...props
}: HeaderProps): React.JSX.Element => {
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const variants = {
		hidden: { height: 0, opacity: 0 },
		visible: { height: 'auto', opacity: 1 }
	};
	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo aria-label='Logo' className={styles.logo} />
			<ul className={styles.list}>
				<li>
					<Link href='/' className={styles.link}>
						Home
					</Link>
				</li>
				<li aria-label='A list item with a button inside to open the list of categories'>
					<button
						type='button'
						aria-label='Open list category'
						aria-expanded={isMenuOpen}
						onClick={toggleMenu}
						id='btncat'
						className={styles.link}
					>
						Product
					</button>
					<motion.div
						animate={isMenuOpen ? 'visible' : 'hidden'}
						initial='hidden'
						variants={variants}
						className={styles.animatedMenu}
					>
						<Menu isMenuOpened={isMenuOpen} />
					</motion.div>
				</li>
				<li>
					<Link href='/about' className={styles.link}>
						About us
					</Link>
				</li>
			</ul>
		</header>
	);
};
