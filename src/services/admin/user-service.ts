import { AxiosResponse } from "axios";
import User from "src/types/admin/user";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const userApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest("/users", params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/users/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/users/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: IApiPayload<User>): Promise<IApiResponse<User>> =>
    buildPostRequest("/users", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: IApiPayload<User>): Promise<IApiResponse<User>> =>
    buildPutRequest(`/users/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
};

export default userApiService;
