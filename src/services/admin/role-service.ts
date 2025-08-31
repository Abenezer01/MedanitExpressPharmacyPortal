import { AxiosResponse } from "axios";
import Role from "src/types/admin/role";
import Permission from "src/types/admin/role/permission";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const roleApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest("/roles", params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/roles/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/roles/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: IApiPayload<Role>): Promise<IApiResponse> =>
    buildPostRequest("/roles", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: IApiPayload<Role>): Promise<IApiResponse> =>
    buildPutRequest(`/roles/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  assignPermission: (
    role_id: string,
    body: {
      data: { permissions: { id: string; is_selected: boolean }[] };
      files: any[];
    },
  ): Promise<IApiResponse> =>
    buildPutRequest(`/roles/${role_id}/assign-permission`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getPermissionByRole: (
    role_id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<Permission[]>> =>
    buildGetRequest(`/roles/${role_id}/permissions`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
};

export default roleApiService;
