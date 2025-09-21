import { IAllProducts } from '@/interfaces/products';

export interface CardsProps extends React.HTMLAttributes<HTMLDivElement> {
	products: IAllProducts;
}
