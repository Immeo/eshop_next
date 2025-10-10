import cn from 'classnames';
import Form from 'next/form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import GlassIcon from './glass.svg';
import style from './SearchForm.module.css';
import { SearchFormProps } from './SearchForm.props';

export const SearchForm = ({
	className,
	...props
}: SearchFormProps): React.JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	return (
		<Form action='/search' className={cn(className, style.search)} {...props}>
			<input
				type='text'
				name='q'
				placeholder='Search...'
				className={style.input}
			/>
			<button type='submit' className={style.btn}>
				<GlassIcon />
			</button>
		</Form>
	);
};
