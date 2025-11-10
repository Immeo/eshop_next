import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface WindowFormsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isOpenedWindow: boolean;
}
