import { IProduct } from '@/interfaces/products';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	product: IProduct;
}
