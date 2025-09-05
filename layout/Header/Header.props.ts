import React, { HTMLAttributes } from 'react';

export interface HeaderProps
	extends React.DetailedHTMLProps<
		HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}
