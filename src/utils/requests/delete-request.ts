import { AxiosResponse } from "axios";
import axiosServices from "../axios";

export const buildDeleteRequest = async (
  url: string,
): Promise<AxiosResponse> => {
  try {
    const requestParams: Record<string, any> = {};

    const response = await axiosServices.delete(url, {
      params: requestParams,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
