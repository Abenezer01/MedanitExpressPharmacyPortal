import { useEffect } from "react";
import authConfig from "src/configs/auth";
import { useAuth } from "src/hooks/useAuth";
import axiosServices from "src/utils/axios";

const getToken = () => {
  const storedToken = `Bearer ${window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )}`;

  return storedToken;
};

const useAxiosInterceptors = () => {
  const { isGuestGuard, logout } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosServices.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = token;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosServices.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 401 && !isGuestGuard) {
            const currentUrl = window.location.pathname;
            if (!currentUrl.includes("login")) {
              logout();
            }
          } else {
            console.error("API Error Response:", error.response.data);
          }

          return Promise.reject(error.response.data || "API request failed");
        } else {
          console.error("Network or connection error:", error);

          return Promise.reject("Network error");
        }
      },
    );

    return () => {
      axiosServices.interceptors.request.eject(requestInterceptor);
      axiosServices.interceptors.response.eject(responseInterceptor);
    };
  }, [isGuestGuard]);

  return axiosServices;
};

export default useAxiosInterceptors;
