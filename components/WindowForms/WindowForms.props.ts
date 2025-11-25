import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface WindowFormsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setIsOpenedWindow?: (value: boolean) => void;
	isOpenedWindow: boolean;
}
