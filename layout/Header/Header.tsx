import cn from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Menu } from '../Menu/Menu';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import BurgerIcon from './burger.svg';
import CloseIcon from './close.svg';
import Logo from './eshop.svg';

export const Header = ({
	className,
	...props
}: HeaderProps): React.JSX.Element => {
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] =
		React.useState<boolean>(false);
	const route = useRouter();

	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		} else if (isMobileMenuOpen) {
			setIsMobileMenuOpen(false);
		}
	}, [route]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const variants = {
		hidden: { height: 0, opacity: 0 },
		visible: { height: 'auto', opacity: 1 }
	};

	const variantsMobile = {
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
						<Menu isMenuOpened={isMenuOpen} className={styles.subMenuDesktop} />
					</motion.div>
				</li>
				<li>
					<Link href='/about' className={styles.link}>
						About us
					</Link>
				</li>
			</ul>
			<button
				type='button'
				aria-label='Open mobile menu'
				onClick={toggleMobileMenu}
				className={styles.burgerBtn}
			>
				<BurgerIcon className={styles.burger} />
			</button>
			{isMobileMenuOpen && (
				<div
					tabIndex={isMobileMenuOpen ? 0 : -1}
					className={
						isMobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClose
					}
				>
					<button
						type='button'
						onClick={toggleMobileMenu}
						className={styles.closeBtn}
					>
						<CloseIcon className={styles.close} />
					</button>
					<motion.ul
						initial='hidden'
						variants={variantsMobile}
						animate={isMobileMenuOpen ? 'visible' : 'hidden'}
						aria-label='Mobile menu'
						className={styles.mobileList}
					>
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
								className={styles.mobileanimatedMenu}
							>
								<Menu
									isMenuOpened={isMenuOpen}
									className={styles.subMenuMobile}
								/>
							</motion.div>
						</li>
						<li>
							<Link href='/about' className={styles.link}>
								About us
							</Link>
						</li>
					</motion.ul>
				</div>
			)}
		</header>
	);
};
