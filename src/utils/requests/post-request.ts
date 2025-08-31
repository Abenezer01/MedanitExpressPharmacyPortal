import { AxiosResponse } from "axios";
import { PostRequestParam } from "src/types/requests";
import axiosServices from "../axios";

export type PostFileType = {
  type: string;
  file: any;
};
export const buildPostRequest = async (
  url: string,
  params: PostRequestParam | null,
  useFormData = true,
): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    if (useFormData) {
      if (params?.files !== null) {
        params?.files?.forEach((file, index) => {
          formData.append(`media[${index}][file]`, file.file);
          formData.append(`media[${index}][type]`, file.type);
        });
      }
      if (params?.data !== null) {
        for (const [key, value] of Object.entries(params?.data || {})) {
          if (typeof value === "string" || typeof value === "number") {
            if (typeof value === "boolean") {
              formData.append(key, value ? "1" : "0");
            } else {
              formData.append(key, String(value));
            }
          }
        }
      }
    }

    const response = await axiosServices.post(
      url,
      useFormData ? formData : params?.data,
      useFormData ? { headers: { "Content-Type": "multipart/form-data" } } : {},
    );

    return response;
  } catch (error) {
    throw error;
  }
};
