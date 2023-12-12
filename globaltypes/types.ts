export type ErrorType = 400 | 401 | 403 | 404 | 409;

export type ErrorCase = 1 | 2;

export interface IErrorResponse {
	message?: string;
	error?: string;
}

export interface ITel {
	tel: number;
}

export interface ITelRes {
	tel: string;
}

export interface IGroupId {
	group_id: number;
}

export interface IGroupName {
	group_name: string;
}


export interface IUserId { user_id: number; }

export interface IUser extends ITel, IUserId {
	user_login: string;
	emai: string;
	user_name: string;
	user_active?: boolean;
	user_password: string;
	balance?: number;
	user_token?: string | null;
	user_create_date: Date;
}

export interface INewDataUser {
	email: string;
	user_login: string;
	tel: string;
	user_name: string;
	user_fild: string;
}

export interface IClient extends ITel {
	first_name?: string;
	middle_name?: string;
	last_name?: string;
	date_of_birth?: Date;
	parameter_1?: string;
	parameter_2?: string;
}

export interface IClientDatabase extends IClientId, IClient, IUserId { }

export interface IGroup extends IGroupId, IGroupName, IUserId { }

export interface IUserChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface IClientsIdWithTel extends IClientId, ITel { }

export type SmsStatusEnum = "pending" | "rejected" | "fulfield";

export interface IClientUpdateReqArray {
	clients: IClient[]
};

export interface IClientReq {
	client: IClient
};

export interface IClentCreateReqArray extends IGroupName, IClientUpdateReqArray { };

export interface IClientId { client_id: number; }

export interface IClientId {
	client_id: number;
}

export interface IClientDatabase extends IClientId, IClient, IUserId { }


export interface IGroupId { group_id: number; }

export interface IGroupName { group_name: string; }

export interface IGroup extends IGroupId, IGroupName { };

export interface IGroupDatabase extends IGroupId, IGroupName, IUserId { };


export interface IUserChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface FormInputsSignUp {
	login: string;
	password: string;
	repeatPassword: string;
	phone: number;
	email: string;
	name: string;
};

export interface FormInputsLogin {
	login: string;
	password: string;
};

export interface ISession {
	user: {
		email: string;
		user_id: number;
		user_login: string;
		user_name: string;
		user_role: string;
		user_active: boolean;
		tel: string;
		balance: number;
		user_token: string;
		user_create_date: Date;
		iat: number;
		exp: number;
		jti: string;
	}
}