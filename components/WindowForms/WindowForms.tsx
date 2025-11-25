import CloseIcon from '@/helpers/icons/close.svg';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { LoginForm } from '../LoginForm/LoginForm';
import styles from './WindowForms.module.css';
import { WindowFormsProps } from './WindowForms.props';

export enum EWindowForms {
	Login = 'login',
	Registration = 'registration'
}

const MODAL_ANIMATION = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 }
};

export const WindowForms = ({
	setIsOpenedWindow,
	isOpenedWindow = false
}: WindowFormsProps): React.JSX.Element => {
	const [isDefaultForm, setDefaultForm] = useState<boolean>(true);
	const dialogRef = useRef<HTMLDivElement>(null);

	const closeWindow = useCallback(
		() => setIsOpenedWindow?.(false),
		[setIsOpenedWindow]
	);

	// Закрытие по ESC
	useEffect(() => {
		if (!isOpenedWindow) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				closeWindow();
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [isOpenedWindow, closeWindow]);

	// Блокировка скролла и автофокус
	useEffect(() => {
		if (!isOpenedWindow) return;
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		// Фокус в модалку
		setTimeout(() => dialogRef.current?.focus(), 0);
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	}, [isOpenedWindow]);

	// Глобальный outside-click (надёжное закрытие)
	useEffect(() => {
		if (!isOpenedWindow) return;
		const onMouseDown = (e: MouseEvent) => {
			const node = dialogRef.current;
			if (node && !node.contains(e.target as Node)) {
				closeWindow();
			}
		};
		document.addEventListener('mousedown', onMouseDown);
		return () => document.removeEventListener('mousedown', onMouseDown);
	}, [isOpenedWindow, closeWindow]);

	// Портал (рендер только на клиенте)
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!mounted) return <></>;

	return createPortal(
		<AnimatePresence>
			{isOpenedWindow && (
				<motion.div
					key='auth-modal'
					className={styles.windowBackdrop}
					role='dialog'
					aria-modal='true'
					aria-labelledby='auth-modal-title'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onMouseDown={e => {
						// Клик по подложке тоже закрывает
						if (e.target === e.currentTarget) closeWindow();
					}}
				>
					<motion.div
						className={cn(styles.window, styles.show)}
						initial='hidden'
						animate='visible'
						exit='hidden'
						variants={MODAL_ANIMATION}
						tabIndex={-1}
						ref={dialogRef}
						onMouseDown={e => e.stopPropagation()}
					>
						<div className={styles.forms}>
							<button
								type='button'
								onClick={closeWindow}
								className={styles.close}
								aria-label='Close authentication window'
							>
								<CloseIcon />
							</button>

							<h2 id='auth-modal-title' className={styles.title}>
								{isDefaultForm ? 'Login' : 'Registration'}
							</h2>

							<div className={styles.formBody}>
								{isDefaultForm ? (
									<LoginForm />
								) : (
									<>Registration is coming soon…</>
								)}
							</div>

							<button
								type='button'
								onClick={() => setDefaultForm(prev => !prev)}
								className={styles.btn}
								aria-label={
									isDefaultForm ? 'Switch to Registration' : 'Switch to Login'
								}
							>
								{isDefaultForm ? 'Registration' : 'Login'}
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	);
};
