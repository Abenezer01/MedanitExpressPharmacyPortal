import { AxiosResponse } from "axios";
import router from "next/router";
import authConfig from "src/configs/auth";
import { ForgotPasswordParams, ResetPasswordParams } from "src/context/types";
import { IApiResponse } from "src/types/requests";
import { buildPostRequest } from "src/utils/requests/post-request";

export const forgotPassword = async (
  params: ForgotPasswordParams,
): Promise<void> => {
  try {
    const response: AxiosResponse<IApiResponse> = await buildPostRequest(
      authConfig.forgotPasswordEndpoint,
      { data: params },
      false,
    );
    const payload = response.data.payload;

    // Assuming redirectURL is a part of the response payload or derived from it
    const redirectURL = payload.redirectURL || "/auth/login"; // Adjust as necessary
    await router.replace(redirectURL);
  } catch (err: any) {
    throw err;
  }
};

export const resetPassword = async (
  params: ResetPasswordParams,
): Promise<void> => {
  try {
    const response: AxiosResponse<IApiResponse> = await buildPostRequest(
      authConfig.resetPasswordEndpoint,
      { data: params },
      false,
    );
    const payload = response.data.payload;

    // Assuming redirectURL is a part of the response payload or derived from it
    const redirectURL = payload.redirectURL || "/auth/login"; // Adjust as necessary
    await router.replace(redirectURL);
  } catch (err: any) {
    throw err;
  }
};
