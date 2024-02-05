import { DateTime } from "next-auth/providers/kakao";

export type ErrorType = 400 | 401 | 403 | 404 | 409;

export type ErrorCase = 1 | 2;

export interface IErrorResponse {
	message?: string;
	error?: string;
}

export interface ITel {
	tel: string;
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
	email: string;
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
	user_password: string;
}

export interface IClient {
	tel: string;
	first_name?: string;
	middle_name?: string;
	last_name?: string;
	date_of_birth?: DateTime;
	parameter_1?: string;
	parameter_2?: string;
}

export interface IClientData {
	tel: string;
	last_name: string | undefined;
	first_name: string | undefined;
	middle_name: string | undefined;
	date_of_birth: string;
	parameter_1: string | undefined;
	parameter_2: string | undefined;
}

export interface IClientInput extends IClient {
	client_id?: number;
	ua_date_of_birth?: string;
}

export interface IClientId {
	client_id: number;
}

export interface IClientDatabase extends IClientId, IClient, IUserId {
	ua_date_of_birth?: string;
	total_count?: number;
}

export interface IGroup extends IGroupId, IGroupName, IUserId { }

export interface IGroupData extends IClientDatabase, IGroupName { }

export interface IUserChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface IClientsIdWithTel extends IClientId, ITel { }

export type SmsStatusEnum = "pending" | "rejected" | "fulfield";

export interface IClientReq {
	userId: number;
	groupId: IGroupId;
	client: IClient;
};

export interface IClientUpdateReq {
	client: IClientDatabase;
};

export interface IClientsDeleteReq {
	clientsId: IClientId[];
}

export interface IClientId { client_id: number; }

export interface IClientDatabase extends IClientId, IClient, IUserId { }


export interface IGroupId { group_id: number; }

export interface IGroupName { group_name: string; }

export interface IGroup extends IGroupId, IGroupName { };

export interface IGroupDatabase extends IGroupId, IGroupName, IUserId {
	group_create_date?: DateTime;
	number_members: number;
};

export interface IGroupCreateReq extends IGroupName, IGroupUpdateReq { };

export interface IGroupUpdateReq {
	clients: IClient[]
};

export interface IGroupEditReq {
	clients: IClientId[];
}


export interface IUserChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface FormInputsSignUp {
	login: string;
	password: string;
	repeatPassword: string;
	contactPerson: string;
	phone: string;
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

export interface FormInputFeedback {
	name?: string;
	phone?: number;
	email: string;
	desc: string;
};

export interface FormInputCreateClient {
	lastName?: string;
	firstName?: string;
	middleName?: string;
	phone: string;
	day?: number;
	month?: number;
	year?: number;
	parameter1?: string;
	parameter2?: string;
};

export interface FormInputUpdateUser {
	login: string;
	password: string;
	newPassword: string;
	userName: string;
	phone: string;
	email: string;
};


