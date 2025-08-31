import { AxiosResponse } from "axios";
import { PostRequestParam } from "src/types/requests";
import axiosServices from "../axios";

export const buildPatchRequest = async (
  url: string,
  params: PostRequestParam | null,
): Promise<AxiosResponse> => {
  try {
    // const formData = new FormData();
    // if (params?.files !== null) {
    //     params?.files.forEach((file, index) => {
    //         formData.append(`media[${index}][file]`, file.file);
    //         formData.append(`media[${index}][type]`, file.type);
    //     });
    // }
    // if (params?.data !== null) {
    //     for (const [key, value] of Object.entries(params?.data || {})) {
    //         if (typeof value === 'string' || value instanceof Blob) {
    //             formData.append(key, value);
    //         }
    //     }
    // }

    const response = await axiosServices.patch(url, params?.data);

    return response;
  } catch (error) {
    throw error;
  }
};
