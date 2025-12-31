import { SearchForm } from '@/components/SearchForm/SearchForm';
import { WindowForms } from '@/components/WindowForms/WindowForms';
import { useAuth } from '@/context/AuthContext';
import CloseIcon from '@/helpers/icons/close.svg';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { Menu } from '../Menu/Menu';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import BurgerIcon from './burger.svg';
import Logo from './eshop.svg';

const COLLAPSE_VARIANTS = {
	hidden: { height: 0, opacity: 0 },
	visible: { height: 'auto', opacity: 1 }
};

export const Header = ({
	className,
	...props
}: HeaderProps): React.JSX.Element => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isAuthWindows, setIsAuthWindows] = useState(false);
	const { user, isAuthed, isReady, logout } = useAuth();

	const displayName = user?.firstName || user?.username || 'User';

	const router = useRouter();

	const desktopCatBtnId = useId();
	const desktopCatPanelId = useId();
	const mobileCatBtnId = useId();
	const mobileCatPanelId = useId();

	console.log(displayName);

	useEffect(() => {
		const handleRouteStart = () => {
			setIsMenuOpen(false);
			setIsMobileMenuOpen(false);
			setIsAuthWindows(false);
		};
		router.events.on('routeChangeStart', handleRouteStart);
		router.events.on('hashChangeStart', handleRouteStart);
		return () => {
			router.events.off('routeChangeStart', handleRouteStart);
			router.events.off('hashChangeStart', handleRouteStart);
		};
	}, [router.events]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (
				e.key === 'Escape' &&
				(isMenuOpen || isMobileMenuOpen || isAuthWindows)
			) {
				e.preventDefault();
				setIsMenuOpen(false);
				setIsMobileMenuOpen(false);
				setIsAuthWindows(false);
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [isMenuOpen, isMobileMenuOpen, isAuthWindows]);

	useEffect(() => {
		if (!isMobileMenuOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isMobileMenuOpen]);

	const toggleMenu = useCallback(() => setIsMenuOpen(v => !v), []);
	const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(v => !v), []);
	const toggleWindow = useCallback(() => setIsAuthWindows(v => !v), []);

	const categoryButtonCommonProps = useMemo(
		() => ({ type: 'button' as const, 'aria-haspopup': 'menu' as const }),
		[]
	);

	return (
		<>
			<header className={cn(styles.header, className)} {...props}>
				<Logo aria-label='Logo' className={styles.logo} />

				<div className={styles.searchDesktop}>
					<SearchForm />
				</div>

				<ul className={styles.list}>
					<li>
						<Link href='/' className={styles.link}>
							Home
						</Link>
					</li>

					<li aria-label='List item with a button to open categories'>
						<button
							{...categoryButtonCommonProps}
							aria-label='Open categories'
							aria-expanded={isMenuOpen}
							aria-controls={desktopCatPanelId}
							onClick={toggleMenu}
							id={desktopCatBtnId}
							className={styles.link}
						>
							Product
						</button>

						<AnimatePresence>
							{isMenuOpen && (
								<motion.div
									key='desktop-submenu'
									initial='hidden'
									animate='visible'
									exit='hidden'
									variants={COLLAPSE_VARIANTS}
									className={styles.animatedMenu}
									role='menu'
									id={desktopCatPanelId}
									aria-labelledby={desktopCatBtnId}
								>
									<Menu
										isMenuOpened={isMenuOpen}
										className={styles.subMenuDesktop}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</li>

					<li>
						<button
							type='button'
							onClick={toggleWindow}
							className={styles.btnAcc}
						>
							Login | Registration
						</button>
					</li>
				</ul>

				<button
					type='button'
					aria-label='Open mobile menu'
					aria-expanded={isMobileMenuOpen}
					aria-controls='mobile-menu-drawer'
					onClick={toggleMobileMenu}
					className={styles.burgerBtn}
				>
					<BurgerIcon className={styles.burger} />
				</button>

				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							key='mobile-menu'
							id='mobile-menu-drawer'
							role='dialog'
							aria-modal='true'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={styles.mobileMenuBackdrop}
							onMouseDown={e => {
								if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
							}}
						>
							<motion.div
								className={styles.mobileMenuOpen}
								initial={{ x: '100%' }}
								animate={{ x: 0 }}
								exit={{ x: '100%' }}
								transition={{ type: 'tween', duration: 0.2 }}
								onMouseDown={e => e.stopPropagation()}
							>
								<button
									type='button'
									onClick={toggleMobileMenu}
									className={styles.closeBtn}
									aria-label='Close mobile menu'
								>
									<CloseIcon className={styles.close} />
								</button>

								<SearchForm className={styles.searchMobile} />

								<motion.ul
									initial='hidden'
									variants={COLLAPSE_VARIANTS}
									animate='visible'
									aria-label='Mobile menu'
									className={styles.mobileList}
								>
									<li>
										<Link
											href='/'
											className={styles.link}
											onClick={() => setIsMobileMenuOpen(false)}
										>
											Home
										</Link>
									</li>

									<li aria-label='List item with a button to open categories'>
										<button
											{...categoryButtonCommonProps}
											aria-label='Open categories'
											aria-expanded={isMenuOpen}
											aria-controls={mobileCatPanelId}
											onClick={toggleMenu}
											id={mobileCatBtnId}
											className={styles.link}
										>
											Product
										</button>

										<AnimatePresence>
											{isMenuOpen && (
												<motion.div
													key='mobile-submenu'
													initial='hidden'
													animate='visible'
													exit='hidden'
													variants={COLLAPSE_VARIANTS}
													className={styles.mobileanimatedMenu}
													role='menu'
													id={mobileCatPanelId}
													aria-labelledby={mobileCatBtnId}
												>
													<Menu
														isMenuOpened={isMenuOpen}
														className={styles.subMenuMobile}
													/>
												</motion.div>
											)}
										</AnimatePresence>
									</li>

									<li>
										{isReady && isAuthed ? (
											<>
												{displayName ? (
													<span className={styles.link}>
														Hello, {displayName}!
													</span>
												) : null}
												<button
													type='button'
													onClick={() => {
														logout();
														setIsMobileMenuOpen(false);
													}}
													className={styles.link}
												>
													Logout
												</button>
											</>
										) : (
											<button
												type='button'
												onClick={toggleWindow}
												className={styles.link}
											>
												Login | Registration
											</button>
										)}
									</li>
								</motion.ul>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</header>

			<WindowForms
				isOpenedWindow={isAuthWindows}
				setIsOpenedWindow={setIsAuthWindows}
			/>
		</>
	);
};
