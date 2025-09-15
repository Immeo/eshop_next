import { MenuContext } from '@/context/menu/menu.context';
import { useContext } from 'react';

export const Menu = () => {
	const { menu } = useContext(MenuContext);
	return (
		<ul>
			{menu.map(m => (
				<li key={m.slug}>{m.name}</li>
			))}
		</ul>
	);
};
