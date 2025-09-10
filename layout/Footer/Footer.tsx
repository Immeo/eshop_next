import cn from 'classnames';
import { format } from 'date-fns';
import React from 'react';
import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';

export const Footer = ({
	className,
	...props
}: FooterProps): React.JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>Eshop © {format(new Date(), 'yyyy')} All rights reserved</div>
			<a href='#' target='_blank'>
				Terms of use
			</a>
			<a href='#' target='_blank'>
				Privacy Policy
			</a>
		</footer>
	);
};
