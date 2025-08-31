import { IApiResponse } from "src/types/requests";

export const parseError = (
  response: IApiResponse,
): { [key: string]: string } => {
  const formikErrors: { [key: string]: string } = {};

  if (Array.isArray(response._errors)) {
    // Handle the case where _errors is an array of strings or objects
    response._errors.forEach((error) => {
      if (typeof error === "string") {
        // Handle the case where _errors is an array of strings
        formikErrors["_error"] = error;
      } else {
        // Handle the case where _errors is an array of objects
        Object.keys(error).forEach((field) => {
          formikErrors[field] = error[field][0];
        });
      }
    });
  } else if (typeof response._errors === "string") {
    // Handle the case where _errors is a string
    formikErrors["_error"] = response._errors;
  }

  return formikErrors;
};
