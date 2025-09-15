import { IMenu } from '@/interfaces/menu';
import { createContext, useState } from 'react';

export interface IMenuContext {
	menu: IMenu[];
	setIsMenuOpened?: (isMenuOpened: boolean) => void;
}

export const MenuContext = createContext<IMenuContext>({
	menu: []
});

export const MenuContextProvider = ({
	menu,
	children
}: IMenuContext & { children: React.ReactNode }) => {
	const [isMenuOpened, setIsMenuOpened] = useState<IMenu[]>(menu);

	const setMenu = (newMenu: IMenu[]) => {
		setIsMenuOpened(newMenu);
	};

	return (
		<MenuContext.Provider value={{ menu }}>{children}</MenuContext.Provider>
	);
};
