import { AuthTokens, AuthUser } from '@/types/auth';

const TOKENS_KEY = 'auth.tokens';
const USER_KEY = 'auth.user';

function isBrowser() {
	return typeof window !== 'undefined';
}

export const authStorage = {
	getTokens(): AuthTokens | null {
		if (!isBrowser()) return null;
		const raw = localStorage.getItem(TOKENS_KEY);
		if (!raw) return null;
		try {
			return JSON.parse(raw) as AuthTokens;
		} catch {
			return null;
		}
	},

	setTokens(tokens: AuthTokens) {
		if (!isBrowser()) return;
		localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
	},

	clearTokens() {
		if (!isBrowser()) return;
		localStorage.removeItem(TOKENS_KEY);
	},

	getUser(): AuthUser | null {
		if (!isBrowser()) return null;
		const raw = localStorage.getItem(USER_KEY);
		if (!raw) return null;
		try {
			return JSON.parse(raw) as AuthUser;
		} catch {
			return null;
		}
	},

	setUser(user: AuthUser) {
		if (!isBrowser()) return;
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	},

	clearUser() {
		if (!isBrowser()) return;
		localStorage.removeItem(USER_KEY);
	},

	clearAll() {
		this.clearTokens();
		this.clearUser();
	}
};
