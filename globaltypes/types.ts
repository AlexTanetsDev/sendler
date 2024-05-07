
import { number } from "joi";
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

export interface IUserId {
	user_id: number;
}

export interface IUser extends ITel, IUserId {
	user_login: string;
	email: string;
	user_name: string;
	user_active?: boolean;
	user_password: string;
	balance?: number;
	user_token?: string | null;
	user_create_date: Date;
	alfa_names_active: string[];
	alfa_names_disable: string[];
	sent_sms: number;
	delivered_sms: number;
	pending_sms: number;
	paid_sms: number;
	adjusment_sms: number;
	rejected_sms: number;
	paymentHistory: IPaymentHistory[];
	sendingSms: ISendingProcess[];
};


export interface IUserAlfaName {
	alfa_name: string;
}

export interface IUserAlfaNameReq {
	alfa_name: string;
	user_id: number;
}

export interface INewDataUser {
	email: string;
	user_login: string;
	tel: string;
	user_password: string;
}

export interface IGroup extends IGroupId, IGroupName, IUserId { }

export interface IGroupData extends IClientDatabase, IGroupName { }

export interface IUserChangePassword {
	oldPassword: string;
	newPassword: string;
}

export interface IClientsIdWithTel extends IClientId, ITel { }

export type SmsStatusEnum = 'pending' | 'rejected' | 'fullfield';

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
	date_of_birth: string | undefined;
	parameter_1: string | undefined;
	parameter_2: string | undefined;
}

export interface IClientReq {
	userId: number;
	groupId: IGroupId;
	client: IClient;
}

export interface IClientArray {
	clients: IClientDatabase[];
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
};

export interface IClientDatabaseWithGroupId extends IClientDatabase {
	group_id?: number;
}

export interface IClientExport {
	tel: string;
	first_name?: string;
	middle_name?: string;
	last_name?: string;
	date_of_birth?: DateTime;
	parameter_1?: string;
	parameter_2?: string;
	client_id?: number;
	ua_date_of_birth?: string;
	total_count?: number;
	id?: number;
}

export interface IClientUpdateReq {
	client: IClientDatabase;
}

export interface IClientsDeleteReq {
	clientsId: IClientId[];
}

export interface IGroupUpdateReq {
	clients: IClient[];
}

export interface IGroupEditReq {
	clients: IClientId[];
}

export interface IClientId {
	client_id: number;
}

export interface IClientDatabase extends IClientId, IClient, IUserId { }

export interface IGroupId {
	group_id: number;
}

export interface IGroupName {
	group_name: string;
}

export interface IGroup extends IGroupId, IGroupName { }

export interface IGroupDatabase extends IGroupId, IGroupName, IUserId {
	group_create_date?: DateTime;
	number_members: number;
	automatically_generated: boolean;
}

export interface IPaymentHistory {
	transaction_id: number;
	user_id: number;
	sms_count: number;
	money_count: string;
	transactions_date: string;
	paymant_date: string | null;
	paid: boolean;
}

export interface IDebts {
	transaction_id: number;
	user_id: number;
	sms_count: number;
	money_count: string;
	transactions_date: string;
	user_login: string;
	paid: boolean;
}


export interface IGroupCreateReq extends IGroupName, IGroupUpdateReq { }

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
}

export interface FormInputsLogin {
	login: string;
	password: string;
}

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
	};
}

export interface FormInputFeedback {
	name?: string;
	phone?: number;
	email: string;
	desc: string;
}

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
}

export interface FormInputUpdateUser {
	login: string;
	password: string;
	newPassword: string;
	userName: string;
	phone: string;
	email: string;
}

export interface ISendSMS {
	userName: string;
	recipients: (string | number)[];
	date?: string;
	time?: string;
	contentSMS: string;
	send_method: 'api' | 'web';
};

export interface IGetSendSmsClients {
	recipients: (string | number)[];
}

export interface ISendHistoryDatabase {
	history_id: number,
	sending_group_date: Date,
	send_method: 'api' | 'web',
	text_sms: string,
	sending_permission: boolean,
	userName: string
};

export interface ISmsIdentificatorsDatabase {
	sms_id: number;
	history_id: number;
	client_id: number;
	identificator: string;
}

export interface IRecipientStatusDatabase {
	recipient_id: number;
	history_id: number;
	client_id: number;
	recipient_status: SmsStatusEnum;
	status_changing_date: Date;
	identificator: string;
	group_id: number;
}

export interface IStatusSmsRes {
	State: number;
	CreationDateUtc: string;
	SubmittedDateUtc: string;
	ReportedDateUtc: string;
	TimeStampUtc: string;
	Price: number;
};

export interface allUsers {
	user_id: number;
	user_name: string;
	tel: string;
	user_login: string;
	balance: number;
};

export interface AlfaName {
	alfa_name_id: number;
	alfa_name: string;
	user_id: number;
	alfa_name_active: boolean;
	alfa_name_param: boolean;
};

export interface combinedAlfaNameAndUser {
	id: string;
	balance: number;
	tel: string;
	user_active: boolean;
	user_login: string;
	email: string;
	alfa_name_id: number;
	alfa_name: string[] | null;
	alfa_name_active: boolean;
	user_id: number;
	description: string;
};

export interface IResAjustmentSms {
	sum: string;
};

export interface IResPaidSms {
	paid_sms: string;
};

export interface IResDeliveredSms {
	delevered_sms: string;
};

export interface IResSentdSms {
	sent_sms: string;
};

export interface IResPendingSms {
	pending_sms: string;
};

export interface IResRejectedSms {
	rejected_sms: string;
};

export interface IResAlfaNames {
	alfa_name: string;
	alfa_name_active: boolean;
};

export interface IResUserBalance {
	result: number;
};

export interface IResUserSmsSendingInProgress {
	history_id: number;
	recipient_status: string;
	count: number
};

export interface ISendingProcess {
	history_id: number;
	fullfield?: number;
	rejected?: number;
	pending?: number;
	date: Date;
};

export interface IUserResData extends IResAjustmentSms, IResPaidSms, IResDeliveredSms, IResSentdSms, IResPendingSms, IResRejectedSms, IResAlfaNames { };