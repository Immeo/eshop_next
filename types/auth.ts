export type AuthUser = {
	id: number;
	username: string;
	email: string;
	firstName?: string;
	lastName?: string;
	image?: string;
};

export type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

export type LoginResponse = AuthTokens &
	AuthUser & {
		gender?: string;
	};

export type RefreshResponse = Partial<AuthTokens> & {
	accessToken: string;
};
