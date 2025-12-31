import { API } from '@/helpers/api';
import type { AuthTokens, RefreshResponse } from '@/types/auth';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authStorage } from './authStorage';

type AuthHandlers = {
	onLogout?: () => void;
	onTokensUpdated?: (tokens: AuthTokens) => void;
};

let handlers: AuthHandlers = {};

export function bindAuthHandlers(next: AuthHandlers) {
	handlers = next;
}

export const http = axios.create({
	headers: { 'Content-Type': 'application/json' }
});

/** Подставляем accessToken в каждый запрос */
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const tokens = authStorage.getTokens();
	if (tokens?.accessToken) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${tokens.accessToken}`;
	}
	return config;
});

/**
 * Очередь запросов на время refresh:
 * пока refresh идёт — все 401-запросы ждут новый токен, потом повторяются.
 */
let isRefreshing = false;
let waitQueue: Array<(token: string | null) => void> = [];

function enqueue(cb: (token: string | null) => void) {
	waitQueue.push(cb);
}

function flushQueue(token: string | null) {
	waitQueue.forEach(cb => cb(token));
	waitQueue = [];
}

async function refreshTokensOrThrow(): Promise<AuthTokens> {
	const current = authStorage.getTokens();
	if (!current?.refreshToken) {
		throw new Error('No refresh token');
	}

	const { data } = await axios.post<RefreshResponse>(
		API.byAuth.refresh,
		{ refreshToken: current.refreshToken },
		{ headers: { 'Content-Type': 'application/json' } }
	);

	const next: AuthTokens = {
		accessToken: data.accessToken,
		refreshToken: data.refreshToken ?? current.refreshToken
	};

	authStorage.setTokens(next);
	handlers.onTokensUpdated?.(next);

	return next;
}

http.interceptors.response.use(
	res => res,
	async (error: AxiosError) => {
		const original = error.config as any;

		const status = error.response?.status;
		const is401 = status === 401;

		const isRefreshCall =
			typeof original?.url === 'string' &&
			original.url.includes('/auth/refresh');

		if (!is401 || !original || original._retry || isRefreshCall) {
			return Promise.reject(error);
		}

		original._retry = true;

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				enqueue(token => {
					if (!token) return reject(error);
					original.headers = original.headers ?? {};
					original.headers.Authorization = `Bearer ${token}`;
					resolve(http(original));
				});
			});
		}

		isRefreshing = true;

		try {
			const nextTokens = await refreshTokensOrThrow();
			flushQueue(nextTokens.accessToken);

			original.headers = original.headers ?? {};
			original.headers.Authorization = `Bearer ${nextTokens.accessToken}`;

			return http(original);
		} catch (refreshErr) {
			flushQueue(null);
			authStorage.clearAll();
			handlers.onLogout?.();

			return Promise.reject(refreshErr);
		} finally {
			isRefreshing = false;
		}
	}
);
