export type ErrorType = 400 | 401 | 403 | 404 | 409;

export interface IGroupIdInDatabase { group_id: number };

export interface IUserClientTelObject { tel: string };

export interface IGroupId { group_id: number };

export interface IUserIdInDataBase { user_id: number };

export interface IGroupNameInDatabase { group_name: string };









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
