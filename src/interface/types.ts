export type ObjectType = {
	[key: string]: unknown;
};

export type BaseResponse = {
	statusCode: string;
	statusMessage: string;
};

export type UserRequest = {
	email: string;
	password: string;
	rememberMe: boolean;
};

export type UserResponse = {
	token: string;
	userOrg: string;
} & BaseResponse;
