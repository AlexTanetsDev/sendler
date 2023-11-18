export type ErrorType = 400 | 401 | 403 | 404 | 409;

export type ErrorCase = 1 | 2 | 3;

export interface IErrorResponse {
  message?: string;
  error?: string;
}

export interface IUserId {
  user_id: number;
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
  user_token?: string;
}

export interface IClient extends ITel {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  date_of_birth?: Date;
  parameter_1?: string;
  parameter_2?: string;
}

export interface IClientId {
  client_id: number;
}

export interface IClientDatabase extends IClientId, IClient, IUserId {}

export interface IGroup extends IGroupId, IGroupName, IUserId {}

export interface IUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

// export interface ISchemasReqCreatGroup extends IGroup, IClient {
// 	cache: string;
// }

// export interface IUser extends ITel, IUserId { user_login: string, user_password: string, balance?: number | undefined, user_token?: string, email: string, user_create_date: Date };

//?-------------------------------------------------------------------

// export interface QueryResultBase {
// 	command: string;
// 	rowCount: number;
// 	oid: number;
// 	fields: FieldDef[];
// }

// export interface QueryResultRow {
// 	[column: string]: any;
// }

// export interface QueryResult<R extends QueryResultRow = any>
// 	extends QueryResultBase {
// 	rows: R[];
// }

// export interface QueryArrayResult<R extends any[] = any[]>
// 	extends QueryResultBase {
// 	rows: R[];
// }

// export interface FieldDef {
// 	name: string;
// 	tableID: number;
// 	columnID: number;
// 	dataTypeID: number;
// 	dataTypeSize: number;
// 	dataTypeModifier: number;
// 	format: string;
// }

//?-------------------------------------------------------------------
