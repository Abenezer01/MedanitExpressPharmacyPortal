import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { FileModel, FileModelUpload } from "src/types/general/file";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { buildGetRequest } from "src/utils/requests/get-request";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3010/';

export const getProfilePictureURL = (user_id: string | undefined) =>
  `${baseURL}/generics/files/${user_id}/profile_picture`;

export const customAxios = axios.create({
  baseURL
});
// Define types and interfaces
export interface FileUploadResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
export const uploadFile = async (
  fileToUpload: FileModelUpload,
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", fileToUpload.file);
    formData.append("fileable_type", fileToUpload.type);
    formData.append("fileable_id", fileToUpload.fileable_id);
    formData.append("file_description", fileToUpload.file_description);
    formData.append("file_type", fileToUpload.type);

    const response = await customAxios.post(
      `/generics/file/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data.imageUrl;
    } else {
      throw new Error("Failed to upload file");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
// Delete photo
export const deleteFile = (id: string | number): Promise<AxiosResponse<FileUploadResponse>> =>
  customAxios.delete(`/generics/files/${id}`);

export const useGetMultipleFiles = (params: GetRequestParam) => {
  return useQuery({
    queryKey: ['multiple-photo', params],
    queryFn: async () => {
      const response: AxiosResponse<IApiResponse<FileModel[]>> = await buildGetRequest(`/generics/files`, params);
      return response.data; // Assuming response.data is of type ImageModel[]
    }
  });
};

/**
 * Converts a file size in bytes to a human-readable format (KB, MB, GB, etc.).
 * @param bytes - The file size in bytes.
 * @param decimals - Number of decimal points to display. Default is 2.
 * @returns The human-readable file size.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
}
