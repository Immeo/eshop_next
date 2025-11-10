import cn from 'classnames';
import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './WindowForms.module.css';
import { WindowFormsProps } from './WindowForms.props';

export const WindowForms = ({
	isOpenedWindow = false
}: WindowFormsProps): React.JSX.Element => {
	const [isDefaultForm, setDefaultForm] = useState<boolean>(false);

	const animation = {
		hidden: {
			opacity: 0,
			y: 200
		},
		visible: {
			opacity: 1,
			y: 0
		}
	};

	return (
		<div
			className={cn(styles.window, {
				[styles.hidden]: !isOpenedWindow,
				[styles.show]: isOpenedWindow
			})}
		>
			<motion.div
				initial={'hidden'}
				animate={isOpenedWindow ? 'visible' : 'hidden'}
				variants={animation}
			>
				<div className={styles.forms}>
					<p>{isDefaultForm ? 'Login' : 'Registration'}</p>
					<button
						type='button'
						onClick={() => setDefaultForm(!isDefaultForm)}
						className={styles.btn}
					>
						{isDefaultForm ? 'Login' : 'Registration'}
					</button>
				</div>
			</motion.div>
		</div>
	);
};
