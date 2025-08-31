import { ACLObj } from "src/configs/acl";
import { Pagination } from "./pagination";
import User from "../admin/user";

export type GetRequestParam = {
  locale?: string | null;
  pagination?: { pageSize: number; page: number } | null;
  filter?: any;
  search?: {};
  sorting?: { property: string; direction: string } | null;
  includes?: string[] | null;
  position?: string | null;
};

export const defaultGetRequestParam: GetRequestParam = {
  locale: "en",
  pagination: null,
  filter: undefined,
  sorting: { property: "created_at", direction: "DESC" },
  includes: [""],
  search: undefined,
};

export type PostRequestParam = {
  files?: { type: string; file: File }[] | null;
  data?: any | null;
};
export type DeleteRequestParam = {
  locale: string | null;
};
export type PutRequestParam = {
  locale?: string | null;
  data?: any | null;
  published?: any | null;
  archived?: any | null;
};
export interface IAccessToken {
  token: string;
  tokenExpiration: string;
  refreshToken: string;
  refreshTokenExpiration: string;
}

export interface IAuthLogin {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  status: number;
  type: string;
  updatedAt: string;
  deviceToken: string;
  accessToken: IAccessToken;
}
export interface IAuthLoginResponse {
  abilities: ACLObj[];
  user_data: User;
  access_token: string;
}

export interface IApiResponse<T = any> {
  [x: string]: any;

  _links: any[] | null;
  _warning: any[] | null;
  _attributes: any | IAttributePagination | null;
  _errors: any[] | null;
  _generated: string | null;
  payload: T;
}

export interface IAttributePagination {
  pagination: Pagination;
}
export interface IApiPayload<T = any> {
  data: T;
  files: any[];
}
