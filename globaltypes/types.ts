export type ErrorType = 400 | 401 | 403 | 404 | 409;

export interface ITel {
  tel: string;
}

export interface IUserId {
  user_id: number;
}

export interface IGroupId {
  group_id: number;
}

export interface IClientId {
  client_id: number;
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

export interface IClient extends IClientId, ITel {}

export interface IUserСlient extends IClient, IUserId {}

export interface IGroup extends IGroupId, IGroupName, IUserId {}

export interface IUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

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

export interface QueryResult<R extends QueryResultRow = any>
  extends QueryResultBase {
  rows: R[];
}

export interface QueryArrayResult<R extends any[] = any[]>
  extends QueryResultBase {
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
