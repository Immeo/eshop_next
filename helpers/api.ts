import { IProduct } from '@/interfaces/products';

type productKey = keyof IProduct;

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
		solo: (id: string) => process.env.NEXT_PUBLIC_DOMAIN + `products/${id}`,
		search: (query: string) =>
			process.env.NEXT_PUBLIC_DOMAIN + `products/search?q=${query}`,
		sort: (what: productKey, order: 'asc' | 'desc') =>
			process.env.NEXT_PUBLIC_DOMAIN +
			`products?sorting=${what}&order=${order}`,
		someAndSort: (what: productKey, order: 'asc' | 'desc', limit: number) =>
			process.env.NEXT_PUBLIC_DOMAIN +
			`products?sorting=${what}&order=${order}&limit=${limit}`
	},
	auth: {
		login: process.env.NEXT_PUBLIC_DOMAIN + 'auth/login'
	}
};
