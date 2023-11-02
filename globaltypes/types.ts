export type ErrorType = 400 | 401 | 403 | 404 | 409;

export interface ITel { tel: string };

export interface IUser extends ITel { user_id: number };

export interface IGroupId { group_id: number };

export interface IUserId { user_id: number };

export interface IClientId { client_id: number };

export interface IGroupName { group_name: string };

export interface IClient extends ITel, IUser { client_id: number };

export interface IGroup extends IGroupName, IUserId { group_id: number };

//?-------------------------------------------------------------------

export interface QueryResultBase {
	command: string;
	rowCount: number;
	oid: number;
	fields: FieldDef[];
}

export interface QueryResultRow {
	[column: string]: any;
}

export interface QueryResult<R extends QueryResultRow = any> extends QueryResultBase {
	rows: R[];
}

export interface QueryArrayResult<R extends any[] = any[]> extends QueryResultBase {
	rows: R[];
}

export interface FieldDef {
	name: string;
	tableID: number;
	columnID: number;
	dataTypeID: number;
	dataTypeSize: number;
	dataTypeModifier: number;
	format: string;
}

//?-------------------------------------------------------------------
