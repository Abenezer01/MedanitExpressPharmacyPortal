// ** React Imports
import { ReactNode, createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios

// ** Config
import authConfig from "src/configs/auth";

// ** Types
import { AxiosResponse } from "axios";
import User from "src/types/admin/user";
import { IApiResponse, IAuthLoginResponse } from "src/types/requests";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { AuthValuesType, ErrCallbackType, LoginParams } from "./types";
import getHomeRoute from "src/layouts/components/acl/getHomeRoute";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  authLoading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  setAuthLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isGuestGuard: false,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [authLoading, setAuthLoading] = useState<boolean>(false);


  // ** Hooks
  const router = useRouter();

  // Get guestGuard and authGuard from window object set in _app.tsx
  let isGuestGuard = false;
  if (typeof window !== 'undefined' && window.__NEXT_GUARD_PROPS__) {
    isGuestGuard = window.__NEXT_GUARD_PROPS__.guestGuard;
  }
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = `Bearer ${window.localStorage.getItem(
        authConfig.storageTokenKeyName,
      )!}`;
      if (storedToken) {
        setLoading(true);
        await buildGetRequest(authConfig.meEndpoint, {})
          .then(async (response: AxiosResponse<IApiResponse>) => {
            setUser({ ...response.data.payload.user_data });
          })
          .catch(() => {
            localStorage.removeItem(authConfig.storageTokenKeyName);
            localStorage.removeItem("refreshToken");
            localStorage.removeItem(authConfig.storageUserDataKeyName);
            setUser(null);
            setLoading(false);
            if (
              authConfig.onTokenExpiration === "logout" &&
              !router.pathname.includes("login") && !isGuestGuard
            ) {
              router.replace("/auth/login");
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType,
  ) => {
    setAuthLoading(true);
    buildPostRequest(authConfig.loginEndpoint, { data: params }, false)
      .then(
        async (response: AxiosResponse<IApiResponse<IAuthLoginResponse>>) => {
          const payload = response.data.payload;
          params.rememberMe
            ? window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              payload.access_token,
            )
            : null;
          const returnUrl = router.query.returnUrl;

          setUser({ ...payload.user_data });
          console.log("login error", payload);

          params.rememberMe
            ? window.localStorage.setItem(
              authConfig.storageUserDataKeyName,
              JSON.stringify(payload.user_data),
            )
            : null;
          params.rememberMe
            ? window.localStorage.setItem(
              authConfig.storageAbilitiesDataKeyName,
              JSON.stringify(payload.abilities),
            )
            : null;

          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : getHomeRoute(user?.roles ? user?.roles[0].name : "");

          router.replace(redirectURL as string);
        },
      )

      .catch((err) => {
        console.log("login error", err);
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const handleLogout = (returnUrl?: string) => {
    setUser(null);
    window.localStorage.removeItem(authConfig.storageUserDataKeyName);
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/auth/login?returnUrl=", returnUrl);
  };

  const values = {
    user,
    loading,
    authLoading,
    setUser,
    setLoading,
    setAuthLoading,
    login: handleLogin,
    logout: handleLogout,
    isGuestGuard,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
