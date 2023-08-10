export type ObjectType = {
  [key: string]: unknown;
};

export type DateRangeType = { from: string; to: string };

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
  email: string;
} & BaseResponse;

export type BaseAuthDataRequest = {
  organization: string;
  view: string;
};

export type BaseAuthDataResponse = {
  status: BaseResponse;
  result: unknown;
};

export type DataPayloadStructure = {
  chartObject: { requestParam: { dateRange?: ObjectType } & ObjectType } & ObjectType;
  orgViewReq: BaseAuthDataRequest;
  emailId: string;
  _id: string;
};
