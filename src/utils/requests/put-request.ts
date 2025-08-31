import { AxiosResponse } from "axios";
import { PutRequestParam } from "src/types/requests";
import axiosServices from "../axios";

export const buildPutRequest = async (
  url: string,
  params: PutRequestParam | null,
): Promise<AxiosResponse> => {
  try {
    const response = await axiosServices.put(url, params?.data);

    return response;
  } catch (error) {
    throw error;
  }
};
