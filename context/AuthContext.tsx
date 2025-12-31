import { authStorage } from '@/features/authStorage';
import { bindAuthHandlers, http } from '@/features/http';
import { API } from '@/helpers/api';
import type { AuthTokens, AuthUser, LoginResponse } from '@/types/auth';
import axios from 'axios';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';

type LoginValues = { username: string; password: string };

type AuthContextValue = {
	user: AuthUser | null;
	tokens: AuthTokens | null;
	isReady: boolean;
	isAuthed: boolean;

	login: (values: LoginValues) => Promise<void>;
	logout: () => void;
	refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [tokens, setTokens] = useState<AuthTokens | null>(null);
	const [isReady, setIsReady] = useState(false);

	const logout = useCallback(() => {
		authStorage.clearAll();
		setTokens(null);
		setUser(null);
	}, []);

	useEffect(() => {
		setTokens(authStorage.getTokens());
		setUser(authStorage.getUser());
		setIsReady(true);
	}, []);

	useEffect(() => {
		bindAuthHandlers({
			onLogout: logout,
			onTokensUpdated: t => setTokens(t)
		});
	}, [logout]);

	const isAuthed = !!tokens?.accessToken;

	const login = useCallback(async (values: LoginValues) => {
		const { data } = await axios.post<LoginResponse>(
			API.byAuth.login,
			{ username: values.username, password: values.password },
			{ headers: { 'Content-Type': 'application/json' } }
		);

		const newTokens: AuthTokens = {
			accessToken: data.accessToken,
			refreshToken: data.refreshToken
		};

		const newUser: AuthUser = {
			id: data.id,
			username: data.username,
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			image: data.image
		};

		authStorage.setTokens(newTokens);
		authStorage.setUser(newUser);

		setTokens(newTokens);
		setUser(newUser);
	}, []);

	const refreshMe = useCallback(async () => {
		if (!authStorage.getTokens()?.accessToken) return;

		const { data } = await http.get<any>(API.byAuth.me);

		const normalized: AuthUser = {
			id: data.id,
			username: data.username,
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			image: data.image
		};

		authStorage.setUser(normalized);
		setUser(normalized);
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			tokens,
			isReady,
			isAuthed,
			login,
			logout,
			refreshMe
		}),
		[user, tokens, isReady, isAuthed, login, logout, refreshMe]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
	return ctx;
}
