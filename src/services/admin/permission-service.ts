import { AxiosResponse } from "axios";
import Permission from "src/types/admin/role/permission";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const permissionApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<Permission[]>> =>
    buildGetRequest("/permissions", params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getOne: (
    idx: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<Permission>> =>
    buildGetRequest(`/permissions/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/permissions/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: IApiPayload<Permission>): Promise<IApiResponse> =>
    buildPostRequest("/permissions", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: IApiPayload<Permission>): Promise<IApiResponse> =>
    buildPutRequest(`/permissions/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getMe: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest("/me", params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
};

export default permissionApiService;
