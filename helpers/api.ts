import { Product } from '@/interfaces/products';

export const API = {
	byCategory: {
		all: process.env.NEXT_PUBLIC_DOMAIN + 'products/categories',
		withCategory: (category: string) =>
			process.env.NEXT_PUBLIC_DOMAIN + `products/category/${category}`
	},
	byProduct: {
		all: process.env.NEXT_PUBLIC_DOMAIN + 'products',
		some: (limit: number) =>
			process.env.NEXT_PUBLIC_DOMAIN + `products?limit=${limit}`,
		solo: (id: number) => process.env.NEXT_PUBLIC_DOMAIN + `products/${id}`,
		sort: (what: Product, order: 'asc' | 'desc') =>
			process.env.NEXT_PUBLIC_DOMAIN + `products?sorting=${what}&order=${order}`
	}
};
