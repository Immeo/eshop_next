import cn from 'classnames';
import { useRouter } from 'next/router';
import { KeyboardEvent, useState } from 'react';
import style from './Search.module.css';
import { SearchProps } from './Search.props';
import GlassIcon from './glass.svg';

export const Search = ({
	className,
	...props
}: SearchProps): React.JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			goToSearch();
		}
	};

	return (
		<form role='search' className={cn(className, style.search)} {...props}>
			<input
				placeholder='Search...'
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
				className={style.input}
			/>
			<button
				onClick={goToSearch}
				aria-label='Site search'
				className={style.btn}
			>
				{<GlassIcon />}
			</button>
		</form>
	);
};
